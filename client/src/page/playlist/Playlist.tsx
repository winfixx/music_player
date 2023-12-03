import * as React from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorResponse } from '../../api/rtk/api'
import { libraryApi } from '../../api/rtk/library.api'
import { playlistApi } from '../../api/rtk/playlist.api'
import FieldDescriptionTrack from '../../components/fieldDescriptionTrack/FieldDescriptionTrack'
import FieldSearchTracks from '../../components/fieldSearchTracks/FieldSearchTracks'
import Heading from '../../components/heading/Heading'
import ListTrackForPlaylist from '../../components/list/listTrack/ListTrackForPlaylist'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import NameBlocks from '../../components/nameBLocks/NameBlocks'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { GRID_TEMPLATE_FOR_RECOMMENDATIONS, SERVER_API, TRACK_ROUTE } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import updatePlaylistThunk from '../../redux/actions/updatePlaylistThunk'
import { modalAction } from '../../redux/reducers/modalSlice'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import { useSetColor } from '../../types/useSetColor'
import styles from './Playlist.module.scss'
import ListTrackForRecommendations from '../../components/list/listTrack/ListTrackForRecommendations'
import AvatarTitle from '../../components/avatarTitle/AvatarTitle'
import AlbumName from '../../components/list/listTrack/partsItemTrack/AlbumName'
import ButtonShared from '../../components/button/button-shared/ButtonShared'
import ItemTrack from '../../components/list/listTrack/ItemTrack'

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
    const [addPlaylistInLibrary] = playlistApi.useAddPlaylistInLibraryMutation()
    const [deletePlaylistFromLibrary] = playlistApi.useDeletePlaylistFromLibraryMutation()
    const [addTrackInLibrary] = playlistApi.useAddTrackInPlaylistMutation()
    const [deleteTrackFromLibrary] = playlistApi.useDeleteTrackFromPlaylistMutation()
    const [updateLibrary] = libraryApi.useUpdateLibraryMutation()
    const [deletePlaylistFromAll, { isSuccess: isSuccessDeletePlaylist }] = playlistApi.useDeletePlaylistFromAllMutation()
    const actionsModal = useActionCreators(modalAction)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { color, onSetColor } = useSetColor(dataPlaylist?.avatar)

    React.useEffect(() => {
        if (isSuccessDeletePlaylist) navigate('/')
    }, [isSuccessDeletePlaylist])

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

        await dispatch(updatePlaylistThunk(formData))
            .unwrap()
            .then(async () => {
                await refetchPlaylist()
                await updateLibrary(null)
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
            <ColorExtractor
                rgb
                src={`${SERVER_API}/image/${dataPlaylist?.avatar}`}
                getColors={onSetColor}
            />
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
                color={color}
                onShowModal={onShowModal}
            />

            <TrackMenu haveInLibrary={dataPlaylist?.usersPlaylist ? dataPlaylist?.usersPlaylist[0]?.id === user.id : false}
                author={dataPlaylist?.author.id === user.id}
                addInLibrary={async () => await addPlaylistInLibrary({ userId: user.id, playlistId: dataPlaylist?.id })}
                deleteFromLibrary={async () => await deletePlaylistFromLibrary({ userId: user.id, playlistId: dataPlaylist?.id })}
                deleteFromAll={async () => await deletePlaylistFromAll({ userId: user.id, playlistId: dataPlaylist?.id })}
                userId={user.id}
                type='плейлист'
                authorId={dataPlaylist?.author?.id}
                playlistId={dataPlaylist?.id}
                showChangeInfoModal={showModal}
                setShowChangeInfoModal={setShowModal}
                color={color}
                deleteFrom='медиатеки'
            />

            <div className={styles.content__track}>
                <FieldDescriptionTrack playlist={true} />

                {dataPlaylist?.tracks?.length
                    ? <ListTrackForPlaylist tracks={dataPlaylist.tracks}
                        authorId={dataPlaylist.author?.id}
                        userId={user.id}
                        addInLibrary={addTrackInLibrary}
                        deleteTrackFromLibrary={deleteTrackFromLibrary}
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
                        && <div className={styles.rec}>
                            <div>
                                <NameBlocks title='Рекомендации'
                                    mainInfo='Похоже на треки из этого плейлиста'
                                />

                                <ListTrackForRecommendations>
                                    {dataPlaylist?.tracks?.map((track, index) =>
                                        <ItemTrack key={track.id}
                                            style={{
                                                gridTemplateColumns: GRID_TEMPLATE_FOR_RECOMMENDATIONS,
                                                animationDelay: `.${index}s`,
                                            }}
                                        >
                                            <AvatarTitle avatar={track.avatar}
                                                nameAuthor={track.author.name}
                                                name={track.name}
                                                idAuthor={track.author.id}
                                                pathToTitle={`/${TRACK_ROUTE}/${track.id}`}
                                            />
                                            <AlbumName nameAlbumTrack={track.album?.name}
                                                idAlbum={track.album?.id}
                                            />
                                            <ButtonShared type='submit'
                                                onClickButton={
                                                    async () => await addTrackInLibrary({ userId: user.id, playlistId: playlistId, trackId: track.id })
                                                }
                                                style={{ color: '#fff', background: 'none', border: '1px solid #1ed760', fontSize: '14px' }}
                                            >
                                                Добавить
                                            </ButtonShared>
                                        </ItemTrack>
                                    )}
                                </ListTrackForRecommendations>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Playlist
