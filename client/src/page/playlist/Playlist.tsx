import * as React from 'react'
import { useParams } from 'react-router-dom'
import { ErrorResponse } from '../../api/rtk/api'
import { playlistApi } from '../../api/rtk/playlist.api'
import FieldDescriptionTrack from '../../components/fieldDescriptionTrack/FieldDescriptionTrack'
import FieldSearchTracks from '../../components/fieldSearchTracks/FieldSearchTracks'
import Heading from '../../components/heading/Heading'
import ListTrackForPlaylist from '../../components/list/listTrack/ListTrackForPlaylist'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import RecommendationsTrack from '../../components/recommendationsTrack/RecommendationsTrack'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import updatePlaylistThunk from '../../redux/actions/updatePlaylistThunk'
import { modalAction } from '../../redux/reducers/modalSlice'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import styles from './Playlist.module.scss'

const Playlist: React.FC = () => {
    const [showModal, setShowModal] = React.useState(false)
    const [infos, setInfos] = React.useState<ChangeInfoHeading>({
        name: '',
        avatar: undefined,
        deleteAvatar: false
    })
    const [closeSearch, setCloseSearch] = React.useState(false)
    const [errorChangeInfo, setErrorChangeInfo] = React.useState('')
    const { playlistId } = useParams()
    const { user } = useAppSelector(state => state.userReducer)
    const { data: dataPlaylist, refetch: refetchPlaylist, isError: isErrorPlaylist, error: errorPlaylist } = playlistApi.useGetOnePlaylistQuery({ playlistId, userId: user.id })
    const [updatePlaylist] = playlistApi.useUpdatePlaylistMutation()
    const [addPlaylistInLibrary] = playlistApi.useAddPlaylistInLibraryMutation()
    const [deletePlaylistFromLibrary] = playlistApi.useDeletePlaylistFromLibraryMutation()
    const [addTrackInLibrary] = playlistApi.useAddTrackInPlaylistMutation()
    const [deleteTrackFromLibrary] = playlistApi.useDeleteTrackFromPlaylistMutation()
    const actionsModal = useActionCreators(modalAction)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if (dataPlaylist?.name) setInfos({ ...infos, name: dataPlaylist.name })
    }, [dataPlaylist?.name])

    React.useEffect(() => {
        if (isErrorPlaylist) {
            actionsModal.onOpenModal(null)
            actionsModal.addErrorMessage({ message: (errorPlaylist as ErrorResponse)?.data?.message })
        }
    }, [isErrorPlaylist])

    const handleSearch = React.useCallback((searchData: string) => {
        console.log(searchData)
    }, [])

    const onShowModal = React.useCallback(() => {
        if (user.id === dataPlaylist?.author.id) {
            return setShowModal(!showModal)
        }
        return
    }, [showModal, user.id, dataPlaylist?.author.id])

    const onSubmitChange = React.useCallback(async () => {
        if (errorChangeInfo) {
            actionsModal.onOpenModal(null)
            actionsModal.addErrorMessage({ message: errorChangeInfo })
            return
        }

        const formData = new FormData()
        formData.append('playlistId', String(dataPlaylist?.id))
        formData.append('userId', String(user.id))
        if (infos.avatar) formData.append('avatar', infos.avatar, infos.avatar?.name)
        formData.append('name', String(infos.name))
        formData.append('deleteAvatar', String(infos.deleteAvatar))

        await updatePlaylist(null)
        await dispatch(updatePlaylistThunk(formData))
            .unwrap()
            .then(() => refetchPlaylist())
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
                    avatar={dataPlaylist?.avatar}
                    infos={infos}
                    setInfos={setInfos}
                    errorChangeInfo={errorChangeInfo}
                    setErrorChangeInfo={setErrorChangeInfo}
                />
            }

            <Heading heading={'Плейлист'}
                authorName={dataPlaylist?.author.name}
                avatar={dataPlaylist?.avatar}
                name={dataPlaylist?.name}
                countTrack={dataPlaylist?.tracks?.length}
                createdAt={dataPlaylist?.createdAt?.split('T')[0].split('-')[0]}
                authorId={dataPlaylist?.author.id}
                userId={user.id}
                onShowModal={onShowModal}
            />

            <TrackMenu haveInLibrary={dataPlaylist?.usersPlaylist ? dataPlaylist?.usersPlaylist[0]?.id === user.id : false}
                author={dataPlaylist?.author.id === user.id}
                addInLibrary={addPlaylistInLibrary}
                deleteFromLibrary={deletePlaylistFromLibrary}
                userId={user.id}
                playlistId={dataPlaylist?.id}
            />

            <div className={styles.content__track}>
                <FieldDescriptionTrack playlist={true} />
                {dataPlaylist?.tracks?.length
                    ? <ListTrackForPlaylist tracks={dataPlaylist.tracks}
                        userId={user.id}
                        addInLibrary={addTrackInLibrary}
                        deleteFromLibrary={deleteTrackFromLibrary}
                    />
                    : <div className={styles.not__found}>
                        <span>Тут пока ничего нет</span>
                    </div>
                }
            </div>

            {dataPlaylist?.author.name === user.name
                && <>
                    <FieldSearchTracks handleSearch={handleSearch}
                        closeSearch={closeSearch}
                        setCloseSearch={setCloseSearch}
                    />
                    {/* LIMIT 10 ITEMS */}
                    {closeSearch
                        && <RecommendationsTrack tracks={dataPlaylist.tracks}
                            addTrackInLibrary={addTrackInLibrary}
                            userId={user.id}
                            playlistId={dataPlaylist.id}
                        />
                    }
                </>
            }
        </>
    )
}

export default Playlist
