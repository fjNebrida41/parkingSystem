import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
export default function Create() {

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        time_in: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("owner.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Add new Owner
                    </h2>

                </div>
            }

        >
            <Head title="Create new Owner" />

            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-2 mt-1">
                <div className="p-9">
                    <div className="max-w-2xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow
                            sm:rounded-lg"
                            >
                                <div className="w-full text-center text-lg text-white">Owner Information</div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="owner_image_path"
                                        value="Owner Image"
                                    />
                                    <TextInput
                                        id="owner_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="owner_name"
                                        value="Owner Name"
                                    />
                                    <TextInput
                                        id="owner_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        isFocused={true}
                                        className="mt-1 block w-full uppercase"
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="owner_time_in"
                                        value="Time In"
                                    />
                                    <TextInput
                                        id="owner_time_in"
                                        type="time"
                                        name="time_in"
                                        value={data.time_in}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData("time_in", e.target.value)}
                                    />
                                    <InputError message={errors.time_in} className="mt-2" />
                                    <div className="mt-4 text-right">
                                        <Link
                                            href={route("owner.index")}
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded 
                                        shadow transition-all hover:bg-gray-400 mr-2"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            href={route("vehicle.create")}
                                            className="bg-blue-500 py-1 px-3 text-white rounded 
                                        shadow transition-all hover:bg-blue-800"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}