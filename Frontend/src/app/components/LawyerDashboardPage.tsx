import { useEffect, useState } from "react";
import { Briefcase, LogOut, Scale, Upload } from "lucide-react";
import { useNavigate } from "react-router";
import { apiFetch, clearLawyer, clearToken, getLawyer, setLawyer, type LawyerUser } from "../../lib/api";

export function LawyerDashboardPage() {
  const navigate = useNavigate();
  const [lawyer, setLawyerState] = useState<LawyerUser | null>(() => getLawyer());
  const [error, setError] = useState("");
  const [name, setName] = useState(lawyer?.name ?? "");
  const [phone, setPhone] = useState(lawyer?.phone ?? "");
  const [primaryPracticeArea, setPrimaryPracticeArea] = useState(lawyer?.primaryPracticeArea ?? "");
  const [yearsOfExperience, setYearsOfExperience] = useState(String(lawyer?.yearsOfExperience ?? ""));
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(lawyer?.profilePicture ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiFetch("/auth/dashboard-lawyer")
      .then((data) => {
        const currentLawyer = data?.lawyer;
        if (!currentLawyer) throw new Error("Lawyer profile not found");
        setLawyer(currentLawyer);
        setLawyerState(currentLawyer);
        setName(currentLawyer.name ?? "");
        setPhone(currentLawyer.phone ?? "");
        setPrimaryPracticeArea(currentLawyer.primaryPracticeArea ?? "");
        setYearsOfExperience(String(currentLawyer.yearsOfExperience ?? ""));
        setProfilePreview(currentLawyer.profilePicture ?? "");
      })
      .catch((err: any) => {
        setError(err.message ?? "Unable to load your dashboard");
        if (!getLawyer()) navigate("/login-lawyer");
      });
  }, [navigate]);

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Profile picture must be smaller than 5 MB");
      event.target.value = "";
      return;
    }
    setProfilePicture(file);
    setProfilePreview(URL.createObjectURL(file));
    setMessage("");
  };

  const handleProfileSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("primaryPracticeArea", primaryPracticeArea);
      formData.append("yearsOfExperience", yearsOfExperience);
      if (profilePicture) formData.append("profilePicture", profilePicture);

      const data = await apiFetch("/auth/update-profile-lawyer", {
        method: "PUT",
        body: formData,
      });
      const updatedLawyer = data.user as LawyerUser;
      setLawyer(updatedLawyer);
      setLawyerState(updatedLawyer);
      setProfilePicture(null);
      setProfilePreview(updatedLawyer.profilePicture ?? "");
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.message ?? "Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (value?: string) => value?.trim().split(/\s+/).filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "L";

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout-lawyer");
    } finally {
      clearToken();
      clearLawyer();
      navigate("/login-lawyer");
    }
  };

  if (error && !lawyer) {
    return <div className="min-h-screen grid place-items-center text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="h-16 bg-[#0F172A] px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-white">
          <Scale className="w-5 h-5" />
          <span className="font-bold">Nyaya Saathi</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F172A] flex items-center justify-center overflow-hidden">
              {lawyer?.profilePicture ? <img src={lawyer.profilePicture} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-white font-bold">{getInitials(lawyer?.name)}</span>}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">Welcome, {lawyer?.name ?? "Lawyer"}</h1>
              <p className="text-sm text-[#6B7280]">{lawyer?.email}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#F8FAFC] rounded-xl p-4"><p className="text-xs text-[#9CA3AF]">Practice area</p><p className="mt-1 font-semibold text-[#0F172A]">{lawyer?.primaryPracticeArea ?? "Not provided"}</p></div>
            <div className="bg-[#F8FAFC] rounded-xl p-4"><p className="text-xs text-[#9CA3AF]">Experience</p><p className="mt-1 font-semibold text-[#0F172A]">{lawyer?.yearsOfExperience ?? 0} years</p></div>
            <div className="bg-[#F8FAFC] rounded-xl p-4"><p className="text-xs text-[#9CA3AF]">Phone</p><p className="mt-1 font-semibold text-[#0F172A]">{lawyer?.phone ?? "Not provided"}</p></div>
            <div className="bg-[#F8FAFC] rounded-xl p-4"><p className="text-xs text-[#9CA3AF]">Bar Council enrollment</p><p className="mt-1 font-semibold text-[#0F172A] break-words">{lawyer?.BarCouncilEnrollment ?? "Not provided"}</p></div>
          </div>
          <form onSubmit={handleProfileSave} className="mt-8 border-t border-[#E5E7EB] pt-8 space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">Update profile</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0F172A] flex items-center justify-center overflow-hidden">
                {profilePreview ? <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" /> : <span className="text-white font-bold">{getInitials(name)}</span>}
              </div>
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F172A] cursor-pointer">
                <Upload className="w-4 h-4" />
                {profilePicture ? "Change picture" : "Upload picture"}
                <input type="file" accept="image/*" className="hidden" onChange={handlePictureChange} />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm" />
              <input value={lawyer?.email ?? ""} disabled className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-[#F8FAFC]" />
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" required className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm" />
              <input value={yearsOfExperience} onChange={(event) => setYearsOfExperience(event.target.value)} type="number" min="0" placeholder="Years of experience" required className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm" />
              <input value={lawyer?.BarCouncilEnrollment ?? ""} disabled placeholder="Bar Council enrollment number" className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-[#F8FAFC] sm:col-span-2" />
              <select value={primaryPracticeArea} onChange={(event) => setPrimaryPracticeArea(event.target.value)} required className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-sm sm:col-span-2">
                <option value="">Select practice area</option>
                {["Criminal Law", "Civil Law", "Family / Matrimonial", "Property / Real Estate", "Consumer Law", "Labour / Employment", "Constitutional / PIL", "Cyber Crime", "Tax Law", "Intellectual Property", "Other"].map((area) => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            <button type="submit" disabled={saving} className="px-5 py-2.5 bg-[#0F172A] text-white rounded-xl text-sm font-semibold disabled:opacity-60">{saving ? "Saving..." : "Save changes"}</button>
            {message && <p className={`text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          </form>
        </div>
      </main>
    </div>
  );
}