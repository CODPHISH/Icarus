import { Avatar } from '@heroui/react';

const Navbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center h-12 border-b border-gray-200">
      <div className="ml-10">deepseek-r1</div>

      <div className="mr-10">
        <Avatar name="Junior" />
      </div>
    </header>
  );
};

export default Navbar;
