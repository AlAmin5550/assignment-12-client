import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../Components/Shared/DashboardTitle";

const PaymentHistory = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['user-payments'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>uniLodge | Requested</title>
            </Helmet>
            <DashboardTitle header="Payments"></DashboardTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>email</th>
                            <th>Transaction Id</th>
                            <th>Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((payment, idx) => <tr key={payment._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    {payment.email}
                                </td>
                                <td>
                                    {payment.transactionId}
                                </td>
                                <th>
                                    {payment.package}
                                </th>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;