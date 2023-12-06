import * as React from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { ErrorResponse, useParams } from 'react-router-dom'
import { userApi } from '../../api/rtk/user.api'
import Heading from '../../components/heading/Heading'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { SERVER_API } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import updateProfileThunk from '../../redux/actions/updateProfileThunk'
import { modalAction } from '../../redux/reducers/modalSlice'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import { useSetColor } from '../../types/useSetColor'

const Profile: React.FunctionComponent = () => {
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
    const { data: dataProfile, refetch: refetchProfile, error: errorProfile, isError: isErrorProfile } = userApi.useGetOneProfileQuery({ userId })
    const [updateInfo] = userApi.useUpdateInfoMutation()
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()
    const { color, onSetColor } = useSetColor(dataProfile?.avatar)

    const onShowModal = React.useCallback(() => {
        if (user.id === dataProfile?.id) {
            return setShowModal(!showModal)
        }
        return
    }, [showModal, user.id, dataProfile])

    React.useEffect(() => {
        if (isErrorProfile) {
            actionsModal.onOpenModal()
            actionsModal.addErrorMessage({ message: (errorProfile as ErrorResponse)?.data?.message })
        }
    }, [isErrorProfile])

    React.useEffect(() => {
        if (dataProfile?.name) setInfos({ ...infos, name: dataProfile.name })
    }, [dataProfile?.name])

    const onSubmitChange = React.useCallback(async () => {
        if (errorChangeInfo) {
            actionsModal.onOpenModal()
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
                await updateInfo(null)
            })
            .catch(e => {
                actionsModal.onOpenModal()
                actionsModal.addErrorMessage({ message: (e as ErrorResponse)?.data?.message })
            })
            .finally(onShowModal)
        return
    }, [errorChangeInfo, infos])

    return (
        <>
            <ColorExtractor
                rgb
                src={`${SERVER_API}/image/${dataProfile?.avatar}`}
                getColors={onSetColor}
            />
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

            <Heading heading={'Профиль'}
                avatar={dataProfile?.avatar}
                name={dataProfile?.name}
                userId={user.id}
                onShowModal={onShowModal}
                authorId={dataProfile?.id}
                color={color}
                countPlaylist={dataProfile?.playlists.length}
                countAlbum={dataProfile?.albums.length}
                countTrack={dataProfile?.tracks.length}
                isProfile
            />

            <TrackMenu haveInLibrary={dataProfile?.playlists ? !!dataProfile?.playlists[0]?.id : false}
                author={dataProfile?.id === user.id}
                userId={user.id}
                type='профиль'
                authorId={dataProfile?.id}
                playlistId={dataProfile?.id}
                showChangeInfoModal={showModal}
                setShowChangeInfoModal={setShowModal}
                isProfile
                color={color}
                
            />

        </>
    )
}

export default Profile
