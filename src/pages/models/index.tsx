import ModelCard from './ModelCard';

export interface ModelCardData {
  icon: string;
  name: string;
  website: string;
  size: string;
  desc: string;
}

export default function Index() {
  const cardList: ModelCardData[] = [
    {
      icon: '',
      name: 'deepseek',
      website: 'deepseek.com',
      size: '617B',
      desc: 'DeepSeek-R1 是一款强化学习（RL）驱动的推理模型，解决了模型中的重复性和可读性问题。在 RL 之前，DeepSeek-R1 引入了冷启动数据，进一步优化了推理性能。它在数学、代码和推理任务中与 OpenAI-o1 表现相当，并且通过精心设计的训练方法，提升了整体效果'
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {cardList.map((card) => (
        <ModelCard cardData={card} />
      ))}
    </div>
  );
}
