interface EmptyStateProps {
  message: string;
  className?: string;
  messageClassName?: string;
}

export function EmptyState({
  message,
  className = 'text-center py-20',
  messageClassName = 'text-gray-400',
}: EmptyStateProps) {
  return (
    <div className={className}>
      <p className={messageClassName}>{message}</p>
    </div>
  );
}
