import { getAllTransactions } from "@/lib/api/admin/admin";
import AllTransactionsTable from "@/components/admin/AllTransactionsTable";

const AdminAllTransaction = async () => {
    // transactions is an array of objects, not a single object
    const transactions = await getAllTransactions() || [];

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2 mb-6">
                <h1 className="text-3xl font-bold text-[#0A2519]">All Transactions</h1>
                <p className="text-gray-600 text-sm">View a complete history of all payments made within the platform.</p>
            </div>
            <AllTransactionsTable transactions={transactions} />
        </div>
    );
};

export default AdminAllTransaction;