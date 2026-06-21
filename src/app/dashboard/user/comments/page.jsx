import { getUserComments } from "@/lib/api/comment/comment";
import { getUserSession } from "@/lib/api/core/getUserSession";
import UserCommentsTable from "@/components/user/UserCommentsTable";

const UserCommentsPage = async () => {
    const user = await getUserSession();
    const userComments = await getUserComments(user?.email);

    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold text-[#0A2519] mb-2">Comment History</h1>
                <p className="text-gray-600 text-sm">Edit or Review your feedback on your previous hired lawyer</p>
            </div>
            
            <UserCommentsTable userComments={userComments} />
        </div>
    );
};

export default UserCommentsPage;