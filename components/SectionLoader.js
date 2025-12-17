export default function SectionLoader({ className = "" }) {
    return (
        <div className={`flex flex-col items-center justify-center py-20 w-full ${className}`}>
            <div className="relative flex flex-col items-center">
                {/* Brand Text - Smaller for section */}
                <div className="mb-6 animate-pulse">
                    <span className="text-3xl font-bold text-[#103E34] tracking-tight">
                        DIZMO<span className="text-[#FCB042] ml-1 text-sm align-top">™</span>
                    </span>
                </div>

                {/* Spinner using Brand Colors */}
                <div className="w-10 h-10 border-4 border-[#103E34]/20 border-t-[#FCB042] rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
