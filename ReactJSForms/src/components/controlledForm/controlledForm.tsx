import { useForm, type SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addEntry,
  type FormEntry,
} from '../../store/storeSlices/formDataReducer';
import { formSchema } from '../../common/validationSchema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

interface ControlledFormProps {
  onClose: () => void;
}

const ControlledForm = ({ onClose }: ControlledFormProps) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.app.countries);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    // resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let pictureBase64: string | undefined;

    if (
      data.picture &&
      data.picture instanceof FileList &&
      data.picture.length > 0
    ) {
      try {
        pictureBase64 = await fileToBase64(data.picture[0]);
      } catch (error) {
        console.error('Failed to process image', error);
        return;
      }
    }

    const entry: FormEntry = {
      id: Date.now().toString(),
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      country: data.country,
      terms: Boolean(data.terms),
      pictureBase64,
    };

    dispatch(addEntry(entry));
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.name ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="age"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.age ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.age ? 'true' : 'false'}
        />
        {errors.age && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.age.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="email"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="password"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="confirmPassword"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.confirmPassword
              ? '1px solid #ef4444'
              : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
        />
        {errors.confirmPassword && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="gender"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Gender
        </label>
        <select
          id="gender"
          {...register('gender')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.gender ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.gender ? 'true' : 'false'}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.gender.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="country"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Country
        </label>
        <input
          id="country"
          list="country-list-controlled"
          {...register('country')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.country ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.country ? 'true' : 'false'}
        />
        <datalist id="country-list-controlled">
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>
        {errors.country && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.country.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor="picture"
          style={{ display: 'block', fontWeight: '500', marginBottom: '4px' }}
        >
          Upload Picture
        </label>
        <input
          id="picture"
          type="file"
          accept="image/png,image/jpeg"
          {...register('picture')}
          style={{
            width: '100%',
            padding: '8px',
            border: errors.picture ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '4px',
          }}
          aria-invalid={errors.picture ? 'true' : 'false'}
        />
        {errors.picture && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.picture.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="terms"
            type="checkbox"
            {...register('terms')}
            style={{ marginRight: '8px' }}
            aria-invalid={errors.terms ? 'true' : 'false'}
          />
          <span>Accept Terms and Conditions</span>
        </label>
        {errors.terms && (
          <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
            {errors.terms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? '#3b82f6' : '#9ca3af',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: isValid ? 'pointer' : 'not-allowed',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
