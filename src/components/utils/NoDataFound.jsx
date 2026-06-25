import { ImFileEmpty } from "react-icons/im";

const NoDataFound = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 w-full my-8">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <ImFileEmpty className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A2519]">{title}</h3>
        </div>
    );
};

export default NoDataFound;