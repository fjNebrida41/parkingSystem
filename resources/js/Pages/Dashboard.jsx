import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({
    totalBicycle,
    totalMotorcycle,
    totalEBike2s,
    totalEBike4s,
    assignedBicycle,
    assignedMotorcycle,
    assignedEBike2s,
    assignedEBike4s,
    total,
    assignedTotal,
    latestOwners,
}) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">

                {/* Cards row */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex gap-2 grid grid-cols-5">

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                            <Link
                                href={route('vehicle.index', { vehicleType: 'bicycle' })}
                                className="text-blue-600 text-xl font-semibold hover:underline"
                            >
                                Bicycle
                            </Link>

                            <p>{assignedBicycle} / {totalBicycle}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                            <Link
                                href={route('vehicle.index', { vehicleType: 'motorcycle' })}
                                className="text-red-600 text-xl font-semibold hover:underline"
                            >
                                Motorcycle
                            </Link>
                            <p>{assignedMotorcycle} / {totalMotorcycle}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                            <Link
                                href={route('vehicle.index', { vehicleType: 'e_bike_2s' })}
                                className="text-green-600 text-xl font-semibold hover:underline"
                            >
                                E Bike 2s
                            </Link>
                            <p>{assignedEBike2s} / {totalEBike2s}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                            <Link
                                href={route('vehicle.index', { vehicleType: 'e_bike_4s' })}
                                className="text-yellow-600 text-xl font-semibold hover:underline"
                            >
                                E Bike 4s
                            </Link>
                            <p>{assignedEBike4s} / {totalEBike4s}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                            <h3 className="text-gray-600 text-xl font-semibold">Total</h3>
                            <p>{assignedTotal} / {total}</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-white-500 text-2xl font-bold mb-4">Latest</h3>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 border-b">
                                    <tr>
                                        <th className="px-4 py-3">ID</th>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Time In</th>
                                        <th className="px-4 py-3">Time Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {latestOwners.data.map((owner) => (
                                        <tr
                                            key={owner.id}
                                            className="dark:hover:bg-gray-700 border-b dark:border-gray-700"
                                        >
                                            <td className="px-4 py-2 text-gray-200">{owner.id}</td>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={owner.image_path}
                                                    className="w-24 h-24 object-cover rounded-md border"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-white uppercase">
                                                <Link
                                                    href={route("owner.show", owner.id)}
                                                    className="hover:underline"
                                                >
                                                    {owner.name}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2 text-gray-200">{owner.time_in}</td>
                                            <td className="px-4 y-2 text-gray-200">
                                                {owner.time_out || "---"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>

        </AuthenticatedLayout>
    );
}
