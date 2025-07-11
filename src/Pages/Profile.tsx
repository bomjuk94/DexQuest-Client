import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import type { Profile } from '../types/models'
import { useProtectedProfile } from '../hooks/useProtectedProfile'
import { capitalizeName } from '../utilities/capitalizeName'
import { showToast } from '../utilities/toast'
import { useColourSchemeStore } from '../stores/colourSchemeStore'
import PokeballSpinner from '../components/PokeballSpinner'
import { useUpdateProfileInfo } from '../hooks/useUpdateProfileInfo'
import { useUpdateTheme } from '../hooks/useUpdateTheme'
import { useUpdateAvatar } from '../hooks/useUpdateAvatar'
import { Helmet } from 'react-helmet'

const Profile = () => {

  const { profile, token, refreshProfile, error } = useProtectedProfile()
  const { changeTheme } = useUpdateTheme()
  const { changeAvatar } = useUpdateAvatar()

  const navigate = useNavigate();

  useEffect(() => {
    if (error === "sessionExpired") {
      navigate("/login?error=sessionExpired");
    }
  }, [error, navigate]);

  const { setColourScheme } = useColourSchemeStore()

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { saveProfileInfo } = useUpdateProfileInfo()

  const updateProfileInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    saveProfileInfo({
      e,
      usernameRef,
      passwordRef,
      emailRef,
      setErrors,
      token,
      refreshProfile,
      formRef,
    })
  }

  useEffect(() => {
    if (errors.length > 0) {
      showToast(
        'error',
        <div>
          {errors.map((error, index) => (
            <div key={index}>
              {index + 1}. {error}
            </div>
          ))}
        </div>
      );
    }
  }, [errors])

  const updateTheme = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeTheme({
      e,
      setColourScheme,
      token,
      refreshProfile
    })
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const updateAvatar = async (file: File) => {
    changeAvatar({ file, token, refreshProfile })
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateAvatar(file)
  };

  if (!profile) return <PokeballSpinner />

  const { contentType, data } = profile.profileImage;
  const imgSrc = `data:${contentType};base64,${data}`

  return (
    <>
      <Helmet>
        <title>Profile - DexQuest</title>
        <meta name="description" content="Update your profile details, preferences, and account settings." />
      </Helmet>

      <div className='bg-primary'>
        <div>
        </div>
        <div className='flex flex-col gap-20 my-0 mx-auto py-20 px-4 max-w-desktop'>
          <div className='flex gap-3.5 items-center'>
            <h2 className='text-primary'>
              Hello {capitalizeName(profile.username)}
            </h2>

            <div className='relative'>
              <img
                src={imgSrc}
                alt="Profile"
                className='w-fifty h-fifty rounded-full'
              />

              <button
                type="button"
                onClick={handleFileButtonClick}
                className='cursor-pointer border-none rounded-full absolute top-0 right-0 bottom-0 left-0 bg-transparent'
              >
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col gap-1.5'>
              <h3 className='text-primary'>
                Colour Scheme
              </h3>
              <select
                name="theme"
                id="theme"
                className='cursor-pointer border-2 rounded-sm w-fit bg-primary border-primary text-primary'
                onChange={updateTheme}
                value={profile.colorScheme}
              >
                <option value="">Default</option>
                <option value="dark">Dark</option>
                <option value="red">Pokemon Red</option>
                <option value="blue">Pokemon Blue</option>
                <option value="green">Pokemon Green</option>
              </select>
            </div>

            <form
              onSubmit={updateProfileInfo}
              className='flex flex-col gap-2.5 items-start'
              ref={formRef}
            >
              <div className='flex flex-col gap-1.5'>
                <h3 className='text-primary'>
                  Username
                </h3>

                <input
                  type="text"
                  ref={usernameRef}
                  className='border-2 py-1.5 px-2.5 rounded-sm text-input input-bkgd border-primary sm:w-fit'
                  defaultValue={profile.username}
                  placeholder='Username'
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <h3 className='text-primary'>
                  Email
                </h3>

                <input
                  type="text"
                  ref={emailRef}
                  className='border-2 py-1.5 px-2.5 rounded-sm text-input input-bkgd border-primary sm:w-fit'
                  defaultValue={profile.email}
                  placeholder='Email'
                />
              </div>

              <div className='flex flex-col gap-1.5'>
                <h3 className='text-primary'>
                  Password
                </h3>

                <input
                  type="text"
                  ref={passwordRef}
                  className='border-2 py-1.5 px-2.5 rounded-sm text-input input-bkgd border-primary sm:w-fit'
                  placeholder='Password'
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className='cursor-pointer border-none rounded-sm py-1.5 px-2.5 text-white hover:opacity-80 col-start-1 col-end-3 btn-bkgd mt-3.5 sm:mt-6'
              />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile