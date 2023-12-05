import * as React from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { ErrorResponse, useNavigate, useParams } from 'react-router-dom'
import { playlistApi } from '../../api/rtk/playlist.api'
import { trackApi } from '../../api/rtk/track.api'
import Heading from '../../components/heading/Heading'
import ListTrackForRecommendations from '../../components/list/listTrack/ListTrackForRecommendations'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { SERVER_API } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import updateTrackThunk from '../../redux/actions/updateTrackThunk'
import { modalAction } from '../../redux/reducers/modalSlice'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import { useSetColor } from '../../types/useSetColor'

const TrackPage: React.FunctionComponent = () => {
    const { trackId } = useParams()
    const [showModal, setShowModal] = React.useState(false)
    const [infos, setInfos] = React.useState<ChangeInfoHeading>({
        name: '',
        avatar: undefined,
        deleteAvatar: false
    })
    const [errorChangeInfo, setErrorChangeInfo] = React.useState('')
    const { user } = useAppSelector(state => state.userReducer)
    const actionsModal = useActionCreators(modalAction)
    const { data: dataTrack, refetch: refetchTrack, error: errorTrack, isError: isErrorTrack } = trackApi.useGetOneTrackQuery({ userId: user.id, trackId })
    const [deleteTrackFromAll, { isSuccess: isSuccessDeleteTrack }] = trackApi.useDeleteTrackFromAllMutation()
    const [addTrackInPlaylist] = playlistApi.useAddTrackInPlaylistMutation()
    const [deleteTrackFromPlaylist] = playlistApi.useDeleteTrackFromPlaylistMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { color, onSetColor } = useSetColor(dataTrack?.avatar)

    const onShowModal = React.useCallback(() => {
        if (user.id === dataTrack?.author.id) {
            return setShowModal(!showModal)
        }
        return
    }, [showModal, user.id, dataTrack?.author.id])

    React.useEffect(() => {
        if (isErrorTrack) {
            actionsModal.onOpenModal()
            actionsModal.addErrorMessage({ message: (errorTrack as ErrorResponse)?.data?.message })
        }
    }, [isErrorTrack])

    React.useEffect(() => {
        if (isSuccessDeleteTrack) navigate('/')
    }, [isSuccessDeleteTrack])

    React.useEffect(() => {
        if (dataTrack?.name) setInfos({ ...infos, name: dataTrack.name })
    }, [dataTrack?.name])

    const onSubmitChange = React.useCallback(async () => {
        if (errorChangeInfo) {
            actionsModal.onOpenModal()
            actionsModal.addErrorMessage({ message: errorChangeInfo })
            return
        }

        const formData = new FormData()
        formData.append('trackId', String(dataTrack?.id))
        formData.append('userId', String(user.id))
        if (infos.avatar) formData.append('avatar', infos.avatar, infos.avatar?.name)
        formData.append('name', String(infos.name))
        formData.append('deleteAvatar', String(infos.deleteAvatar))

        await dispatch(updateTrackThunk(formData))
            .unwrap()
            .then(async () => {
                await refetchTrack()
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
                src={`${SERVER_API}/image/${dataTrack?.avatar}`}
                getColors={onSetColor}
            />

            {showModal
                && <ChangeInfoModal onClickClear={onShowModal}
                    onClickButton={onSubmitChange}
                    avatar={dataTrack?.avatar}
                    infos={infos}
                    setInfos={setInfos}
                    errorChangeInfo={errorChangeInfo}
                    setErrorChangeInfo={setErrorChangeInfo}
                />
            }

            <Heading heading={'Трек'}
                authorName={dataTrack?.author.name}
                avatar={dataTrack?.avatar}
                name={dataTrack?.name}
                createdAt={dataTrack?.createdAt?.split('T')[0].split('-')[0]}
                authorId={dataTrack?.author.id}
                userId={user.id}
                color={color}
                onShowModal={onShowModal}
            />

            <TrackMenu haveInLibrary={dataTrack?.playlists ? !!dataTrack?.playlists[0]?.id : false}
                author={dataTrack?.author.id === user.id}
                deleteFromAll={async () => await deleteTrackFromAll({ userId: user.id, trackId: dataTrack?.id })}
                addInLibrary={async () => await addTrackInPlaylist({ userId: user.id, trackId: dataTrack?.id })}
                deleteFromLibrary={async () => await deleteTrackFromPlaylist({ userId: user.id, trackId: dataTrack?.id })}
                userId={user.id}
                type='трек'
                authorId={dataTrack?.author?.id}
                playlistId={dataTrack?.id}
                showChangeInfoModal={showModal}
                setShowChangeInfoModal={setShowModal}
                color={color}
                deleteFrom='Любимые треки'
                isProfile={false}
            />

            <ListTrackForRecommendations>

            </ListTrackForRecommendations>

        </>
    )
}

export default TrackPage