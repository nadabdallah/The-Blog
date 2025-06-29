interface ContainerProps {
  className?: string;
  testId?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function Container({ className, testId,  children, onClick }: ContainerProps) {
  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={`bg-background ${className}`}
    >
      {children}
    </div>
  );
};