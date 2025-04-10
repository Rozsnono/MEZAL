export default function Loading() {
    return (
        <main className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-zinc-900/40 z-50">
            <div className="w-24 h-24 border-t-4 border-b-4 border-zinc-300 rounded-full animate-spin"></div>
        </main>
    )
}