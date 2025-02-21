import { Card, CardHeader, CardBody, CardFooter, Link, Image, Chip } from '@heroui/react';
import type { ModelCardData } from '.';

interface Props {
  cardData: ModelCardData;
}

const ModelCard: React.FC<Props> = ({ cardData }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt={cardData.name}
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{cardData.name}</p>
          <Link
            isExternal
            showAnchorIcon
            className="text-small text-default-500"
            href={`https://${cardData.website}`}
          >
            {cardData.website}
          </Link>
        </div>
      </CardHeader>

      <CardBody>
        <p className="line-clamp-2 text-gray-500 text-sm">{cardData.desc}</p>
      </CardBody>

      <CardFooter>
        <Chip color="secondary" className="text-xs">
          {cardData.size}
        </Chip>
      </CardFooter>
    </Card>
  );
};

export default ModelCard;
