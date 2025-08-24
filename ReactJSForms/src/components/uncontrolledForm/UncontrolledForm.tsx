import { type FormEvent } from 'react';
import { useAppSelector } from '../../store/hooks';

interface UncontrolledFormProps {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const countries = useAppSelector((state) => state.app.countries);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('Uncontrolled Form:', data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="email" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="text"
          required
          className="mt-1 p-2 w-full border rounded"
          aria-required="true"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="text"
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
