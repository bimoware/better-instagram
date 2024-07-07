export default function SettingsPage(){
    const settings = [
        {
            label: "Profile",
            icon: "profile"
        }
    ]
    return <div className="bg-neutral-900 rounded-xl m-4">
        { settings.map(setting => setting.label) }
    </div>
}