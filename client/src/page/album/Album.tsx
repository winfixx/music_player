import * as React from 'react'
import { ErrorResponse, useParams } from 'react-router-dom'
import { albumApi } from '../../api/rtk/album.api'
import { playlistApi } from '../../api/rtk/playlist.api'
import FieldDescriptionTrack from '../../components/fieldDescriptionTrack/FieldDescriptionTrack'
import Heading from '../../components/heading/Heading'
import ListTrackForAlbum from '../../components/list/listTrack/ListTrackForAlbum'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { GRID_TEMPLATE_FOR_ALBUM } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import updateAlbumThunk from '../../redux/actions/updateAlbumThunk'
import { modalAction } from '../../redux/reducers/modalSlice'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import styles from './Album.module.scss'

const Album: React.FunctionComponent = () => {
    const [showModal, setShowModal] = React.useState(false)
    const [infos, setInfos] = React.useState<ChangeInfoHeading>({
        name: '',
        avatar: undefined,
        deleteAvatar: false
    })
    const [errorChangeInfo, setErrorChangeInfo] = React.useState('')
    const { albumId } = useParams()
    const { user } = useAppSelector(state => state.userReducer)
    const { data: dataAlbum, refetch: refetchAlbum, error: errorAlbum, isError: isErrorAlbum } = albumApi.useGetOneAlbumQuery({ albumId, userId: user.id })
    const [updateAlbum] = albumApi.useUpdateAlbumMutation()
    const [addAlbumInLibrary] = albumApi.useAddAlbumInLibraryMutation()
    const [deleteAlbumFromLibrary] = albumApi.useDeleteAlbumFromLibraryMutation()
    const [addTrackInPlaylist] = playlistApi.useAddTrackInPlaylistMutation()
    const [deleteTrackFromPlaylist] = playlistApi.useDeleteTrackFromPlaylistMutation()

    const actionsModal = useActionCreators(modalAction)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (dataAlbum?.name) setInfos({ ...infos, name: dataAlbum.name })
    }, [dataAlbum?.name])

    React.useEffect(() => {
        if (isErrorAlbum) {
            actionsModal.onOpenModal(null)
            actionsModal.addErrorMessage({ message: (errorAlbum as ErrorResponse)?.data?.message })
        }
    }, [isErrorAlbum])

    const onShowModal = React.useCallback(() => {
        if (user.id === dataAlbum?.author.id) {
            return setShowModal(!showModal)
        }
        return
    }, [showModal, user.id, dataAlbum?.author.id])

    const onSubmitChange = React.useCallback(async () => {
        if (errorChangeInfo) {
            actionsModal.onOpenModal(null)
            actionsModal.addErrorMessage({ message: errorChangeInfo })
            return
        }

        const formData = new FormData()
        formData.append('albumId', String(dataAlbum?.id))
        formData.append('userId', String(user.id))
        if (infos.avatar) formData.append('avatar', infos.avatar, infos.avatar?.name)
        formData.append('name', String(infos.name))
        formData.append('deleteAvatar', String(infos.deleteAvatar))

        await updateAlbum(null)
        await dispatch(updateAlbumThunk(formData))
            .unwrap()
            .then(() => refetchAlbum())
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
                && <ChangeInfoModal avatar={dataAlbum?.avatar}
                    infos={infos}
                    setInfos={setInfos}
                    onClickButton={onSubmitChange}
                    onClickClear={onShowModal}
                    errorChangeInfo={errorChangeInfo}
                    setErrorChangeInfo={setErrorChangeInfo}
                />
            }
            <Heading heading={'Альбом'}
                authorName={dataAlbum?.author.name}
                avatar={dataAlbum?.avatar}
                name={dataAlbum?.name}
                countTrack={dataAlbum?.tracks?.length}
                createdAt={dataAlbum?.createdAt?.split('T')[0].split('-')[0]}
                authorId={dataAlbum?.author.id}
                userId={user.id}
                onShowModal={onShowModal}
            />

            <TrackMenu haveInLibrary={dataAlbum?.usersLibrary ? dataAlbum?.usersLibrary[0]?.id === user.id : false}
                author={dataAlbum?.author.id === user.id}
                addInLibrary={async () => await addAlbumInLibrary({ albumId: dataAlbum?.id, userId: user.id })}
                deleteFromLibrary={async () => await deleteAlbumFromLibrary({ albumId: dataAlbum?.id, userId: user.id })}
            />

            <div className={styles.content__track}>
                <FieldDescriptionTrack playlist={false}
                    gridTemplateColumns={GRID_TEMPLATE_FOR_ALBUM}
                />
                {dataAlbum?.tracks.length
                    ? <ListTrackForAlbum tracks={dataAlbum.tracks}
                        addInPlaylist={addTrackInPlaylist}
                        deleteFromPlaylist={deleteTrackFromPlaylist}
                        userId={user.id}
                    />
                    : <div className={styles.not__found}>
                        <span>Тут пока ничего нет</span>
                    </div>
                }
            </div>
        </>
    )
}

export default Album
