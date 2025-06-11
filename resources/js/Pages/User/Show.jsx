import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import VehiclesShow from "../Vehicle/VehiclesShow";

export default function Show({ user, vehicles }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`User "${user.name}"`}
                </h2>
            }
        >
            <Head title={`User "${user.name}"`} />
            <div className="flex gap-90">
                <div className="py-8">
                    <div className="w-[500px] ml-24 pr-1">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 mr-64 text-gray-900 dark:text-gray-100">

                                <div className="mt-1">
                                    <img src={user.image_path} className="w-[200px] h-auto object-contain" alt="User" />
                                </div>
                                
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">User ID</label>
                                            <p className="mt-1">{user.id}</p>
                                        </div>
                                        <div className="mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Time In</label>
                                            <p className="mt-1">{user.time_in}</p>
                                        </div>
                                        <div className="mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Time Out</label>
                                            <p className="mt-1">{user.time_out}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="ml-40 text-nowrap">
                                            <label className="font-bold text-lg ">Created By</label>
                                            <p className="mt-1">{user.createdBy.name}</p>
                                        </div>
                                        <div className="ml-40 mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Updated By</label>
                                            <p className="mt-1">{user.updatedBy.name}</p>
                                        </div>
                                        <div className="ml-40 mt-4 text-nowrap">
                                            <label className="font-bold text-lg ">Created At</label>
                                            <p className="mt-1">{user.created_at}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-8">
                    <div className="w-[500px] mr-24 pl-1">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <VehiclesShow vehicles={vehicles} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}