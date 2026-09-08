export function LoadingState() { return <div className="py-20 text-center text-sm text-zinc-500">Loading career data…</div> }
export function ErrorState({ message }: { message: string }) { return <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{message}</div> }
