'use client';
import React, { InputHTMLAttributes, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Field, FieldContent, FieldError, FieldLabel } from './ui/field';
import { Calendar04, View, ViewOff } from 'asem-icons';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { InfoIcon } from 'lucide-react';
import { IconType } from '@/lib/types';

export type Type =
  | 'text'
  | 'hidden'
  | 'password'
  | 'file'
  | 'date'
  | 'pin'
  | 'time'
  | 'number'
  | 'uploadFile'
  | 'select';

export default function FormInput({
  type,
  label,
  name,
  control,
  className,
  children,
  Icon,
  labelState = true,
  ...props
}: {
  type: Type;
  name: string;
  control: unknown;
  className?: string;
  label?: string;
  Icon?: IconType;
  labelState?: boolean;
  children?: React.ReactNode[]
} & InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState<'password' | 'text'>('password');
  const ref = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false)
  function showHandle() {
    const input = ref.current
    if (!input) return

    // Save cursor position
    const start = input.selectionStart
    const end = input.selectionEnd

    if (show === 'password') {
      setShow('text');
    } else {
      setShow('password');
    }

    // Restore cursor AFTER render
    requestAnimationFrame(() => {
      input.setSelectionRange(start ?? 0, end ?? 0)
    })
  }

  // const { control: newControl } = useFormContext<any>();


  switch (type) {
    case 'text':
      return (
        <Controller
          name={name}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <InputGroup className={`overflow-hidden ${className}`}>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={!labelState ? (label ? label : name) : props.placeholder}
                  {...field}
                  {...props}
                  className={` `}
                />
                {/* <InputGroupAddon>
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon> */}
                {Icon && (
                  <InputGroupAddon align="inline-end">
                    <Icon />
                  </InputGroupAddon>
                )}
              </InputGroup>
              {/* <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={!labelState ? (label ? label : name) : props.placeholder}
                {...field}
                {...props}
                className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
              /> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case "hidden":
      return (
        <Controller
          name={name}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                type="hidden"
                {...field}
                {...props}
                className={`${className}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case 'password':
      return (
        <Controller
          name={name}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <InputGroup className={className}>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  type={show}
                  autoComplete="off"
                  aria-invalid={fieldState.invalid}
                  placeholder={!labelState ? (label ? label : name) : props.placeholder}
                  {...props}
                  ref={ref}
                />
                <InputGroupAddon align="inline-end" className='cursor-pointer' >
                  {show === 'text' ? <ViewOff onClick={showHandle} className='w-6' /> : <View onClick={showHandle} className='w-6' />}
                </InputGroupAddon>
              </InputGroup>
              {/* <span
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-100 transition-all duration-200 cursor-pointer"
                  onClick={showHandle}
                >
                  {show === 'text' ? <ViewOff className='w-5' /> : <View className='w-5' />}
                </span> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case 'number':
      return (
        <Controller
          name={name}
          // control={newControl}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <InputGroup>
                <InputGroupInput
                  type='number'
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={!labelState ? (label ? label : name) : props.placeholder}
                  {...props}
                  className={`block w-full ${className}`}
                />
                {/* <InputGroupAddon>
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon> */}
                {Icon && (
                  <InputGroupAddon align="inline-end">
                    <Icon />
                  </InputGroupAddon>
                )}
              </InputGroup>
              {/* <Input
                type='number'
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={!labelState ? (label ? label : name) : props.placeholder}
                {...props}
                className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
              /> */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case 'file':
      return (
        <>
          <Controller
            name={name}
            // control={newControl}
            control={control as Control<FieldValues> | undefined}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {labelState && (
                  <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                    {label ? label : name}
                  </FieldLabel>
                )}
                <Input
                  type='file'
                  placeholder={!labelState ? (label ? label : name) : props.placeholder}
                  // {...field}
                  {...props}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file); // <-- send file object to React Hook Form
                  }}
                  className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </>
      );
      break;
    case 'select':
      return (
        <Controller
          name={name}
          // control={newControl}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent>
                {labelState && (
                  <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                    {label ? label : name}
                  </FieldLabel>
                )}
                {/* <FieldDescription>
                  For best results, select the language you speak.
                </FieldDescription> */}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Select
                disabled={props.disabled}
                name={field.name}
                value={field.value?.toString()}
                defaultValue={field.value?.toString()}
                onValueChange={(value) => {
                  // console.log('Duration Type Changed:', value)
                  field.onChange(parseInt(value))
                }}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="w-full py-2 font-medium"
                >
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent >
                  {children}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        // <FormField
        //   control={control as Control<FieldValues>}
        //   name={name}
        //   render={({ field: { onChange, value } }) => (
        //     <FormItem>
        //       <input type="hidden" value={value} name={name} />
        //       {labelState && (
        //         <FormLabel className="w-full text-left capitalize text-sm mt-3 -mb-1">
        //           {label ? label : name}
        //         </FormLabel>
        //       )}
        //       <Select onValueChange={onChange} value={value} disabled={props.disabled} >
        //         <FormControl >
        //           <SelectTrigger className="w-full py-2 font-medium">
        //             <SelectValue />
        //           </SelectTrigger>
        //         </FormControl >
        //         <SelectContent >
        //           {children}
        //         </SelectContent>
        //       </Select>
        //       {/* <FormDescription>This is your public display name.</FormDescription> */}
        //       <FormMessage />
        //     </FormItem>
        //   )}
        // />
      );
      break;
    case 'date':
      return (
        <Controller
          name={name}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className={cn(
                      'w-full pl-3 text-left font-normal h-10.5 rounded-lg',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? field.value : <span>Bir tarih seçin</span>}
                    <Calendar04 className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    disabled={{ before: new Date() }}
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      const formattedDate = format(date as Date, 'dd/MM/yyyy');
                      field.onChange(formattedDate);
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case 'pin':
      return (
        <Controller
          name={name}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <InputOTP maxLength={6} {...field} className="w-full ">
                <InputOTPGroup className='w-1/2 grid grid-cols-3'>
                  <InputOTPSlot index={0} className='w-full' />
                  <InputOTPSlot index={1} className='w-full' />
                  <InputOTPSlot index={2} className='w-full' />
                </InputOTPGroup>
                <InputOTPSeparator className='px-2' />
                <InputOTPGroup className='w-1/2 grid grid-cols-3'>
                  <InputOTPSlot index={3} className='w-full' />
                  <InputOTPSlot index={4} className='w-full' />
                  <InputOTPSlot index={5} className='w-full' />
                </InputOTPGroup>
              </InputOTP>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    case 'time':
      return (
        <Controller
          name={name}
          control={control as Control<FieldValues> | undefined}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {labelState && (
                <FieldLabel htmlFor={field.name} className="w-full text-left capitalize text-sm mt-3 -mb-1">
                  {label ? label : name}
                </FieldLabel>
              )}
              <Input
                type="time"
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                onChangeCapture={(e) => {
                  field.onChange(e.currentTarget.value);
                  e.currentTarget.blur();
                }}
                {...props}
                className={`block w-full border-2 !focus:shadow-sm focus:border-mainColor placeholder:text-sm ${className}`}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      );
      break;
    default:
      break;
  }
  return <div>FormInput</div>;
}
