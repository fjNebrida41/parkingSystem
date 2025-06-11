import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
export default function Create({ owner }) {

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        time_out: owner.time_out || "",
        name: owner.name || "",
        time_in: owner.time_in || "",
        _method: 'PUT'
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("owner.update", owner.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Owner : "{owner.name}"
                    </h2>

                </div>
            }

        >
            <Head title="Create new Owner" />

            <div className="p-9">
                <div className="max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow
                            sm:rounded-lg"
                        >
                            {owner.image_path && (
                                <div className="mt-4">
                                    <img src={owner.image_path} className="w-64" />
                                </div>
                            )}

                            <div>
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
                                    readOnly
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("time_in", e.target.value)}
                                />
                                <InputError message={errors.time_in} className="mt-2" />
                                <InputLabel
                                    htmlFor="owner_time_out"
                                    value="Time Out"
                                />
                                <TextInput
                                    id="owner_time_out"
                                    type="time"
                                    name="time_out"
                                    value={data.time_out}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("time_out", e.target.value)}
                                />
                                <InputError message={errors.time_out} className="mt-2" />
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("owner.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded 
                                        shadow transition-all hover:bg-gray-400 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        className="bg-emerald-500 py-1 px-3 text-white rounded 
                                        shadow transition-all hover:bg-emerald-800"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}