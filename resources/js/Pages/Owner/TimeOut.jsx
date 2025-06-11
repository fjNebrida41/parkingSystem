export default function timeOut() {
    return (
        <>
            <InputLabel
                htmlFor="owner_time_out"
                value="Time Out"
            />
            <TextInput
                id="owner_time_out"
                type="time"
                name="time_out"
                className="mt-1 block w-full"
                onChange={(e) => setData("time_out", e.target.value)}
            />
            <InputError message={errors.time_out} className="mt-2" />
        </>
    );
}