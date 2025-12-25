import { Label, InputWithAddon, Button } from "@/components";
import { LuAtSign, LuUser, LuCamera } from "react-icons/lu";
import { ProfileAsset } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice";
import { useEffect, useRef, useState } from "react";
import {
  getProfileAction,
  updateProfileAction,
  updateProfileImageAction,
} from "@/store/profileSlice";
import { Toast } from "@/lib/toast";

const AkunPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024) {
      Toast.fire({
        icon: "warning",
        title: "Ukuran terlalu besar",
        text: "Ukuran gambar maksimum 100kb",
      });
      return;
    }
    dispatch(updateProfileImageAction(file))
      .unwrap()
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Foto profil berhasil diperbarui",
        });
        dispatch(getProfileAction());
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err || "Gagal memperbarui foto profil",
        });
      });
  };

  const onEdit = () => {
    setIsEditing(true);
    setEmail(user?.email || "");
    setFirstName(user?.first_name || "");
    setLastName(user?.last_name || "");
  };

  const onCancel = () => {
    setIsEditing(false);
    setEmail(user?.email || "");
    setFirstName(user?.first_name || "");
    setLastName(user?.last_name || "");
  };

  const onSave = () => {
    dispatch(
      updateProfileAction({
        email,
        first_name: firstName,
        last_name: lastName,
      })
    )
      .unwrap()
      .then(() => {
        Toast.fire({ icon: "success", title: "Profil berhasil disimpan" });
        setIsEditing(false);
        dispatch(getProfileAction());
      })
      .catch((err) => {
        Toast.fire({ icon: "error", title: err || "Gagal menyimpan profil" });
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 px-4 py-6">
        <div className="relative w-32 h-32">
          <img
            src={
              user?.profile_image &&
              user?.profile_image !==
                "https://minio.nutech-integrasi.com/take-home-test/null"
                ? user.profile_image
                : ProfileAsset
            }
            alt="Logo Akun"
            className="w-32 h-32 rounded-full border-2 border-gray-100"
          />
          {isEditing && (
            <button
              type="button"
              className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground border border-white shadow flex items-center justify-center"
              onClick={handleImageClick}
            >
              <LuCamera className="h-4 w-4" />
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <Label className="text-2xl font-semibold">
          {user ? `${user.first_name} ${user.last_name}` : "User"}
        </Label>
        <form
          className="flex w-full flex-col gap-4 mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Email</Label>
            <InputWithAddon
              name="email"
              placeholder="masukan email anda"
              value={isEditing ? email : user?.email || ""}
              readOnly={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<LuAtSign />}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Nama Depan</Label>
            <InputWithAddon
              name="firstName"
              placeholder="masukan nama depan anda"
              value={isEditing ? firstName : user?.first_name || ""}
              readOnly={!isEditing}
              onChange={(e) => setFirstName(e.target.value)}
              leftIcon={<LuUser />}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Nama Belakang</Label>
            <InputWithAddon
              name="lastName"
              placeholder="masukan nama belakang anda"
              value={isEditing ? lastName : user?.last_name || ""}
              readOnly={!isEditing}
              onChange={(e) => setLastName(e.target.value)}
              leftIcon={<LuUser />}
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  className="w-full font-semibold"
                  onClick={onSave}
                >
                  Simpan
                </Button>
                <Button
                  type="button"
                  className="w-full  text-muted-foreground border hover:bg-accent font-semibold"
                  variant="outline"
                  onClick={onCancel}
                >
                  Batalkan
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="w-full  text-red-500 border-red-500 hover:text-red-600 hover:bg-red-50 font-semibold"
                variant="outline"
                onClick={onEdit}
              >
                Edit Profile
              </Button>
            )}
            {!isEditing && (
              <Button
                type="button"
                className="w-full font-semibold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AkunPage;
