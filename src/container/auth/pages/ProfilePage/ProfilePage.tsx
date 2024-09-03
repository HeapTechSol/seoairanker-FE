import { Controller } from 'react-hook-form'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Grid from '@/components/Grid/Grid'
import Avatar from '@/components/Avatar/Avatar'
import Container from '@/components/Container/Container'

import { FaRegUser } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'

import useUpdateUserProfile from '@/container/auth/hooks/useUpdateUserProfile'
import useChangePasswordHandler from '@/container/auth/hooks/useChangePasswordHandler'

import { useAppSelector } from '@/api/store'

import './ProfilePage.scss'

const ProfilePage = () => {
  const user = useAppSelector((state) => state.auth.user?.user)
  const { control, handleSubmit, updatePasswordLoading, changePasswordHandler } = useChangePasswordHandler()
  const { userProfileControl, saveUserProfile, updateProfile, updateUserLoading } = useUpdateUserProfile()

  return (
    <Flex gap={32} align="start">
      <Container width={50} padding={40} borderRadius boxShadow className="profile-container container-bg">
        <Flex vertical gap={64} align="center">
          <Controller
            name="profile_img"
            render={({ field: { onChange, value } }) => {
              return (
                <Avatar
                  src={user?.profileImage}
                  size={200}
                  // fallback={`${convertFirstCharToCapital(user?.firstName[0] || '')}${convertFirstCharToCapital(user?.lastName[0] || '')}`}
                  fallback={
                    <span className="avatar-placeholder">
                      <FaRegUser />
                    </span>
                  }
                  showEditIcon
                  tempImageSrc={value}
                  onImageUpload={onChange}
                />
              )
            }}
            control={userProfileControl}
          />

          <Flex vertical gap={32} align="start">
            <Grid gap={16}>
              <Controller
                name="first_name"
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <Input
                      name="first_name"
                      title="First Name"
                      titlePosition="top"
                      placeholder="Enter your first name"
                      onChange={onChange}
                      value={value}
                      error={error?.message}
                    />
                  )
                }}
                control={userProfileControl}
              />
              <Controller
                name="last_name"
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <Input
                      name="last_name"
                      title="Last Name"
                      titlePosition="top"
                      placeholder="Enter your last name"
                      onChange={onChange}
                      value={value}
                      error={error?.message}
                    />
                  )
                }}
                control={userProfileControl}
              />
            </Grid>
            <Controller
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                  <Input
                    name="email"
                    title="Email"
                    titlePosition="top"
                    placeholder="Enter your email"
                    onChange={onChange}
                    value={value}
                    disabled
                    error={error?.message}
                  />
                )
              }}
              control={userProfileControl}
            />
            <Button type="borderRadius" loading={updateUserLoading} onClick={saveUserProfile(updateProfile)}>
              Update Profile
            </Button>
          </Flex>
        </Flex>
      </Container>
      <Container width={50} padding={40} borderRadius boxShadow className="container-bg">
        <Flex vertical justify="center" gap={32} align="start">
          <Controller
            name="new_password"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="new_password"
                  title="New Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine />}
                  placeholder="Enter your new password"
                />
              )
            }}
            control={control}
          />
          <Controller
            name="confirmPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <Input
                  borderRadius
                  name="confirmPassword"
                  title="Confirm New Password"
                  type="password"
                  titlePosition="top"
                  onChange={onChange}
                  value={value}
                  error={error?.message}
                  StartIcon={<RiLockPasswordLine />}
                  placeholder="Re-enter your new password"
                />
              )
            }}
            control={control}
          />
          <Button variant="filled" size="md" loading={updatePasswordLoading} type="borderRadius" onClick={handleSubmit(changePasswordHandler)}>
            Change Password
          </Button>
        </Flex>
      </Container>
    </Flex>
  )
}

export default ProfilePage
