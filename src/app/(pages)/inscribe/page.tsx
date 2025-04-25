'use client';

import ordinalsbot from '@/lib/ob';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import * as v from 'valibot';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { valibotValidator } from '@tanstack/valibot-form-adapter';
import { storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { EXPLORER_URL, MEMPOOL_URL, ONE_MINUTE, ONE_SECOND, USE_LOW_POSTAGE } from '@/lib/constants';
import { DirectInscriptionOrder, InscriptionOrderState, type InscriptionFile } from 'ordinalsbot/dist/types/v1';
import { useQuery } from '@tanstack/react-query';
import Order from '@/components/Order';
import Charge from '@/components/Charge';
import { LoaderPinwheel } from 'lucide-react';
import { AuthContext } from '@/app/providers/AuthContext';

const directInscribeSchema = v.object({
  file: v.nullable(
    v.pipe(
      v.file(),
      v.mimeType(['image/jpeg', 'image/png', 'text/plain'], 'Please upload one of the supported filetypes'),
      v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
    )
  )
});

type TDirectInscribeForm = v.InferInput<typeof directInscribeSchema>;

export default function Inscribe() {
  const { wallet } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<DirectInscriptionOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, error: orderError, isLoading } = useQuery({
    queryFn: async () => {
      if (!order?.id) return null;
      return ordinalsbot.Inscription().getOrder(order.id);
    },
    queryKey: ['order', order?.id],
    enabled: !!order?.id,
    staleTime: ONE_SECOND.toMillis() * 5,
    refetchInterval: () => {
      if (order?.charge?.address) return ONE_MINUTE.toMillis() / 3;
      return ONE_SECOND.toMillis() * 5;
    }
  });

  const { data: feeRate, isLoading: feeRateLoading, error: feeRateError } = useQuery({
    queryFn: async () => {
      try {
        const response = await fetch('/api/feeRate');
        if (!response.ok) {
          throw new Error('Failed to fetch fee rate');
        }
        return response.json();
      } catch (error) {
        console.error('Fee rate error:', error);
        throw error;
      }
    },
    queryKey: ['feeRate']
  });

  useEffect(() => {
    if (orderError) {
      setError(orderError.message);
    }
    if (feeRateError) {
      setError(feeRateError.message);
    }
  }, [orderError, feeRateError]);

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      setOrder(data as DirectInscriptionOrder);
    }
  }, [data, isLoading]);

  const form = useForm({
    defaultValues: {
      file: null,
    },
    onSubmit: async ({ value }: { value: TDirectInscribeForm }) => {
      setLoading(true);
      setError(null);
      
      try {
        // Validate form data
        v.parse(directInscribeSchema, value);

        if (!value.file) {
          throw new Error('Please select a file');
        }

        if (!wallet?.ordinalsAddress) {
          throw new Error('Please connect a wallet');
        }

        if (feeRateLoading || feeRateError) {
          throw new Error('Fee rate not available. Please try again.');
        }

        const { file } = value;
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const fileRef = ref(storage, `/inscriptions/${Date.now()}.${fileExtension}`);
        
        // Upload file to Firebase Storage
        const uploadResult = await uploadBytes(fileRef, file);
        if (!uploadResult) {
          throw new Error('Failed to upload file');
        }

        const downloadURL = await getDownloadURL(fileRef);
        const { type, name, size } = file;

        // Create inscription order
        const directInscribeResponse = await ordinalsbot.Inscription().createDirectOrder({
          files: [{
            url: downloadURL,
            name,
            size,
            type
          }],
          lowPostage: USE_LOW_POSTAGE,
          fee: feeRate?.fastestFee,
          receiveAddress: wallet.ordinalsAddress
        });

        setOrder(directInscribeResponse);
        toast.success('File uploaded successfully! Please proceed with payment.');

      } catch (error: any) {
        console.error('Inscription error:', error);
        setError(error.message);
        toast.error(error.message || 'Failed to inscribe file');
      } finally {
        setLoading(false);
      }
    },
    validatorAdapter: valibotValidator()
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => setError(null)}>Try Again</Button>
      </div>
    );
  }
  
  return (
    <div className='flex flex-row flex-wrap justify-center w-full pt-10 px-10 gap-5'>
      <div className='flex flex-col justify-between w-2/3 h-48 gap-5'>
        <h2 className='text-2xl'>Inscribe a File</h2>
        <form
          className='flex flex-col'
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name='file'
            children={(field) => {
              const { name } = field;
              return (
                <div className='flex flex-row items-center justify-between gap-2'>
                  <label className='uppercase' htmlFor={name}>{name}</label>
                  <Input
                    className='font-black ring-1'
                    type='file'
                    id={name}
                    name={name}
                    onChange={(e) => {
                      const file = e?.target?.files?.[0];
                      if (file) {
                        form.setFieldValue(name, file);
                      }
                    }}
                  />
                </div>
              );
            }}
          />

          <div className='flex flex-row justify-end mt-5'>
            <Button 
              type='submit' 
              disabled={loading || feeRateLoading || !wallet?.ordinalsAddress}
            >
              {loading ? (
                <>
                  <LoaderPinwheel className='animate-spin mr-2' />
                  Processing...
                </>
              ) : (
                'Inscribe'
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className='w-1/3'>
        <Order loading={isLoading} order={order} />
      </div>

      <div className='w-1/3'>
        <Charge 
          loading={isLoading} 
          charge={order?.charge}
          feeRate={feeRate}
        />
      </div>

      {order?.files && [InscriptionOrderState.QUEUED, InscriptionOrderState.COMPLETED].includes(order.state) && (
        <div className='w-2/3'>
          <h3 className='text-2xl'>Inscription Status</h3>
          {order.files.map((file: InscriptionFile, index: number) => (
            <div className='flex flex-row justify-between rounded-sm border-solid border-2 border-neutral-500 h-12 items-center px-5' key={index}>
              <div className='flex-1'>{index + 1}</div>
              <div className='flex-1'>{file.name}</div>
              <div className='flex-1'>{file.status}</div>
              <div className='flex flex-col'>
                <div className='text-sm'>
                  <a href={`${EXPLORER_URL}/${file.inscriptionId}`} target='_blank' rel='noopener noreferrer'>
                    {file.inscriptionId}
                  </a>
                </div>
                <div className='text-xs'>
                  <a href={`${MEMPOOL_URL}/tx/${file.sent}`} target='_blank' rel='noopener noreferrer'>
                    {file.sent}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}