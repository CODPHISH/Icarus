import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import { Tooltip } from '@heroui/react';

const Sidebar: React.FC = () => {
  interface MenuItems {
    name: string;
    path: string;
    icon: string;
  }

  const topItems: MenuItems[] = [
    { name: '对话', path: '/chat', icon: 'carbon:chat-bot' },
    {
      name: '模型',
      path: '/models',
      icon: 'carbon:model-alt'
    },
    {
      name: '知识库',
      path: '/kb',
      icon: 'carbon:ibm-watson-knowledge-studio'
    }
  ];

  const bottomItems: MenuItems[] = [{ name: '配置', path: '/setting', icon: 'carbon:settings' }];

  const TopMenus = () => {
    return (
      <div className="flex flex-col items-center gap-16 mt-20">
        {topItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <Tooltip content={item.name}>
              <Icon icon={item.icon} className="w-10 h-10" />
            </Tooltip>
          </Link>
        ))}
      </div>
    );
  };

  const BottomMenus = () => {
    return (
      <div className="flex flex-col items-center gap-16 mb-10">
        {bottomItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <Tooltip content={item.name}>
              <Icon icon={item.icon} className="w-10 h-10" />
            </Tooltip>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <aside className="flex flex-col items-center justify-between w-16 h-screen p-1 bg-[#fbfbfa] border-r border-gray-200">
      <TopMenus />
      <BottomMenus />
    </aside>
  );
};

export default Sidebar;
