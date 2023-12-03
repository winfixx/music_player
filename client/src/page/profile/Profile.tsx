import * as React from 'react'
import { ErrorResponse, useNavigate, useParams } from 'react-router-dom'
import Heading from '../../components/heading/Heading'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import { modalAction } from '../../redux/reducers/modalSlice'
import { userApi } from '../../api/rtk/user.api'
import updateProfileThunk from '../../redux/actions/updateProfileThunk'

interface IProfileProps {
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
    const { userId } = useParams()
    const [showModal, setShowModal] = React.useState(false)
    const [infos, setInfos] = React.useState<ChangeInfoHeading>({
        name: '',
        avatar: undefined,
        deleteAvatar: false
    })
    const [errorChangeInfo, setErrorChangeInfo] = React.useState('')
    const { user } = useAppSelector(state => state.userReducer)
    const actionsModal = useActionCreators(modalAction)
    const { data: dataProfile, refetch: refetchProfile, error: errorProfile, isError: isErrorProfile } = userApi.useGetOneProfileQuery({ userId: user.id })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onShowModal = React.useCallback(() => {
        if (user.id === dataProfile?.author.id) {
            return setShowModal(!showModal)
        }
        return
    }, [showModal, user.id, dataProfile?.author.id])

    React.useEffect(() => {
        if (isErrorProfile) {
            actionsModal.onOpenModal(null)
            actionsModal.addErrorMessage({ message: (errorProfile as ErrorResponse)?.data?.message })
        }
    }, [isErrorProfile])

    React.useEffect(() => {
        if (isSuccessDeleteTrack) navigate('/')
    }, [isSuccessDeleteTrack])

    React.useEffect(() => {
        if (dataProfile?.name) setInfos({ ...infos, name: dataProfile.name })
    }, [dataProfile?.name])

    const onSubmitChange = React.useCallback(async () => {
        if (errorChangeInfo) {
            actionsModal.onOpenModal(null)
            actionsModal.addErrorMessage({ message: errorChangeInfo })
            return
        }

        const formData = new FormData()
        formData.append('userId', String(user.id))
        if (infos.avatar) formData.append('avatar', infos.avatar, infos.avatar?.name)
        formData.append('name', String(infos.name))
        formData.append('deleteAvatar', String(infos.deleteAvatar))

        await dispatch(updateProfileThunk(formData))
            .unwrap()
            .then(async () => {
                await refetchProfile()
            })
            .catch(e => {
                actionsModal.onOpenModal(null)
                actionsModal.addErrorMessage({ message: (e as ErrorResponse)?.data?.message })
            })
            .finally(onShowModal)
        return
    }, [errorChangeInfo, infos])

    return (
        <>
            {showModal
                && <ChangeInfoModal onClickClear={onShowModal}
                    onClickButton={onSubmitChange}
                    avatar={dataProfile?.avatar}
                    infos={infos}
                    setInfos={setInfos}
                    errorChangeInfo={errorChangeInfo}
                    setErrorChangeInfo={setErrorChangeInfo}
                />
            }

            <Heading heading={'Трек'}
                authorName={dataProfile?.author.name}
                avatar={dataProfile?.avatar}
                name={dataProfile?.name}
                createdAt={dataProfile?.createdAt?.split('T')[0].split('-')[0]}
                authorId={dataProfile?.author.id}
                userId={user.id}
                onShowModal={onShowModal}
            />

            <TrackMenu haveInLibrary={dataProfile?.playlists ? !!dataProfile?.playlists[0]?.id : false}
                author={dataProfile?.author.id === user.id}
                userId={user.id}
                type='трек'
                authorId={dataProfile?.author?.id}
                playlistId={dataProfile?.id}
                showChangeInfoModal={showModal}
                setShowChangeInfoModal={setShowModal}
                deleteFrom='Любимые треки'
            />

        </>
    )
}

export default Profile
