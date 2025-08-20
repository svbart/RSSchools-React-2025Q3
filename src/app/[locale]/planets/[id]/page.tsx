import ItemDetailsCard from '../../../../components/itemDetailsCard/ItemDetailsCard';

type Props = {
  params: Promise<{ id: string }>;
};

// Server Component
export default async function PlanetDetails({ params }: Props) {
  const { id } = await params;
  const planetId = parseInt(id, 10);

  return <ItemDetailsCard planetId={planetId} />;
}
