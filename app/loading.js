import Loader from "@/components/Loader";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-[#103E34] z-[9999] flex items-center justify-center">
            <Loader />
        </div>
    );
}
