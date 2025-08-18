import ItemDetailsCard from '../../../../components/itemDetailsCard/ItemDetailsCard';

type Props = {
  params: Promise<{ id: string }>;
};

// This is a Server Component - it renders on the server
export default async function PlanetDetails({ params }: Props) {
  const { id } = await params;

  return <ItemDetailsCard planetId={parseInt(id, 10)} />;
}
