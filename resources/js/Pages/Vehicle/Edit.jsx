import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
export default function Create({ vehicle, owners, users }) {

    const { data, setData, post, errors, reset } = useForm({
        image: "",
        type: vehicle.type || "",
        color: vehicle.color || "",
        plate_number: vehicle.plate_number || "",
        description: vehicle.description || "",
        assigned_user_id: vehicle.assigned_user_id || "",
        owner_id: vehicle.owner_id || "",
        _method: 'PUT'
    });

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("vehicle.update", vehicle.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Edit Vehicle : "{vehicle.owner.name}"
                    </h2>
                </div>
            }

        >
            <Head title="Edit Vehicle" />

            <div className="p-9">
                <div className="max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow
                            sm:rounded-lg"
                        >
                            {vehicle.image_path && (
                                <div className="mt-4">
                                    <img src={vehicle.image_path} className="w-64" />
                                </div>
                            )}

                            <div>
                                <InputLabel
                                    htmlFor="vehicle_image_path"
                                    value="Vehicle Image"
                                />
                                <TextInput
                                    id="vehicle_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("image", e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="vehicle_owner_id"
                                    value="Owner ID"
                                />
                                <SelectInput
                                    id="owner_id"
                                    name="vehicle_owner_id"
                                    className="mt-1 block w-full uppercase"
                                    defaultValue={data.owner_id}
                                    onChange={(e) => setData('owner_id', e.target.value)}
                                    disabled
                                >
                                    <option value="">Select Owner</option>
                                    {owners.data.map((owner) => (
                                        <option value={owner.id} key={owner.id}>
                                            {owner.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.owner_id} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <SelectInput
                                    id="vehicle_type"
                                    name="type"
                                    className="mt-1 block w-full"
                                    defaultValue={data.type}
                                    onChange={(e) => setData("type", e.target.value)}
                                >
                                    <option value="">Type</option>
                                    <option value="bicycle">bicycle</option>
                                    <option value="motorcycle">motorcycle</option>
                                    <option value="e_bike_2s">e-bike_2s</option>
                                    <option value="e_bike_4s">e-bike_4s</option>
                                </SelectInput>
                                <InputError message={errors.type} className="mt-2" />
                                <div className="mt-4">
                                    <SelectInput
                                        id="vehicle_color"
                                        name="color"
                                        className="mt-1 block w-full"
                                        defaultValue={data.color}
                                        onChange={(e) => setData("color", e.target.value)}
                                    >
                                        <option value="">Color</option>
                                        <option className="text-white" value="red">Red</option>
                                        <option className="text-white" value="orange">Orange</option>
                                        <option className="text-white" value="green">Green</option>
                                        <option className="text-white" value="blue">Blue</option>
                                        <option className="text-white" value="black">Black</option>
                                        <option className="text-white" value="violet">Violet</option>
                                        <option className="text-white" value="white">White</option>
                                        <option className="text-white" value="silver">Silver</option>
                                        <option className="text-white" value="gray">Gray</option>
                                    </SelectInput>
                                    <InputError message={errors.color} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="vehicle_plate_number"
                                    value="Plate Number"
                                />
                                <TextInput
                                    id="vehicle_plate_number"
                                    type="text"
                                    name="plate_number"
                                    placeholder="if applicable"
                                    value={data.plate_number}
                                    className="mt-1 block w-full uppercase"
                                    onChange={(e) => setData("plate_number", e.target.value)}
                                />
                                <InputError message={errors.plate_number} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="vehicle_description"
                                    value="Description"
                                />
                                <TextAreaInput
                                    id="vehicle_description"
                                    name="description"
                                    placeholder="if applicable"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="vehicle_assigned_user"
                                    value="Assigned User"
                                />
                                <SelectInput
                                    id="vehicle_assigned_user"
                                    name="assigned_user_id"
                                    className="mt-1 block w-full"
                                    defaultValue={data.assigned_user_id}
                                    onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    disabled
                                >
                                    <option value="">Select User</option>
                                    {users.data.map((user) => (
                                        <option value={user.id} key={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.assigned_user_id} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("vehicle.index")}
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
                        </form>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}