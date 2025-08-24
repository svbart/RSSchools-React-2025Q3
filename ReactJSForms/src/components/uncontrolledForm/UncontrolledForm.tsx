import { useRef, useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addEntry,
  type FormEntry,
} from '../../store/storeSlices/formDataReducer';
import { z } from 'zod';
import { formSchema } from '../../common/validationSchema';

// type FormData = z.infer<typeof formSchema>;
interface UncontrolledFormProps {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const countries = useAppSelector((state) => state.app.countries);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    const formData = new FormData(e.currentTarget);
    // Правильно извлекаем данные из FormData
    const pictureFile = formData.get('picture') as File | null;

    // Конвертируем файл в base64
    let pictureBase64 = '';
    if (pictureFile && pictureFile.size > 0) {
      try {
        pictureBase64 = await fileToBase64(pictureFile);
      } catch (error) {
        console.error('Error converting file to base64:', error);
        return;
      }
    }
    const data = {
      name: formData.get('name') as string,
      age: formData.get('age') as string, // Оставляем как строку для Zod
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      terms: formData.get('terms') === 'on' ? 'on' : '', // Правильная обработка checkbox
      picture: pictureFile && pictureFile.size > 0 ? pictureFile : undefined,
    };

    console.log('Data before validation:', data); // Для отладки
    try {
      // Валидация с помощью Zod
      const validatedData = formSchema.parse(data);
      console.log('Validation successful:', validatedData); // Для отладки

      const entry: FormEntry = {
        id: Date.now().toString(),
        name: validatedData.name,
        age: validatedData.age,
        password: validatedData.password,
        confirmPassword: validatedData.confirmPassword,
        email: validatedData.email,
        gender: validatedData.gender,
        country: validatedData.country,
        terms: Boolean(validatedData.terms),
        pictureBase64: pictureBase64,
      };

      dispatch(addEntry(entry));
      onClose();
      formRef.current?.reset();
    } catch (error) {
      console.log('Validation failed:', error); // Для отладки
      if (error instanceof z.ZodError) {
        setErrors(error);
        console.error('Validation errors:', error.issues);
      }
    }

    // const pictureFile = formData.get('picture') as File | null;
    // const pictureUrl = pictureFile
    //   ? URL.createObjectURL(pictureFile)
    //   : undefined;

    // const entry: FormEntry = {
    //   id: Date.now().toString(),
    //   name: data.name as string,
    //   age: Number(data.age),
    //   password: data.password as string,
    //   confirmPassword: data.confirmPassword as string,
    //   email: data.email as string,
    //   gender: data.gender as string,
    //   country: data.country as string,
    //   terms: Boolean(data.terms),
    //   pictureBase64: ,
    // };

    // dispatch(addEntry(entry));
    // onClose();
    // formRef.current?.reset();
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {errors && (
        <div
          style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            borderRadius: '4px',
          }}
        >
          <h4>Validation Errors:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {errors.issues.map((issue, index) => (
              <li key={index}>
                <strong>{issue.path.join('.')}</strong>: {issue.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium">
          Country
        </label>
        <input
          id="country"
          name="country"
          list="country-list"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country.code} value={country.name} />
          ))}
        </datalist>
      </div>
      <div className="mb-4">
        <label htmlFor="picture" className="block text-sm font-medium">
          Upload Picture
        </label>
        <input
          id="picture"
          name="picture"
          type="file"
          accept="image/*"
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="mr-2"
            aria-required="true"
          />
          <span className="text-sm">Accept Terms and Conditions</span>
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
