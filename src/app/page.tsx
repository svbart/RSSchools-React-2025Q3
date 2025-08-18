import { redirect } from 'next/navigation';

export default function RootPage() {
  // Перенаправляем на английскую версию по умолчанию
  redirect('/en');
}
