import * as React from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { BsPerson, BsPlusLg } from 'react-icons/bs'
import { IoMdArrowDropright } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'
import { ErrorResponse, useNavigate, useParams } from 'react-router-dom'
import { albumApi } from '../../api/rtk/album.api'
import { libraryApi } from '../../api/rtk/library.api'
import { playlistApi } from '../../api/rtk/playlist.api'
import AvatarTitle from '../../components/avatarTitle/AvatarTitle'
import ButtonMenu from '../../components/button/button-menu/ButtonMenu'
import FieldDescriptionTrack from '../../components/fieldDescriptionTrack/FieldDescriptionTrack'
import Heading from '../../components/heading/Heading'
import ItemTrack from '../../components/list/listTrack/ItemTrack'
import ListTrackForAlbum from '../../components/list/listTrack/ListTrackForAlbum'
import IndexTrack from '../../components/list/listTrack/partsItemTrack/IndexTrack'
import TimeTrack from '../../components/list/listTrack/partsItemTrack/TImeTrack'
import ContextMenu from '../../components/menu/ContextMenu'
import ChangeInfoModal from '../../components/modals/changeInfoModal/ChangeInfoModal'
import TrackMenu from '../../components/trackMenu/TrackMenu'
import { GRID_TEMPLATE_FOR_ALBUM, PROFILE_ROUTE, SERVER_API, TRACK_ROUTE } from '../../constants/constants'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useActionCreators } from '../../hooks/useActionCreators'
import updateAlbumThunk from '../../redux/actions/updateAlbumThunk'
import { modalAction } from '../../redux/reducers/modalSlice'
import { ChangeInfoHeading } from '../../types/ChangeInfoHeading.type'
import { useSetColor } from '../../types/useSetColor'
import styles from './Album.module.scss'

const Album: React.FunctionComponent = () => {
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [showMenu, setShowMenu] = React.useState<number | null>(null)
    const [infos, setInfos] = React.useState<ChangeInfoHeading>({
        name: '',
        avatar: undefined,
        deleteAvatar: false
    })
    const [errorChangeInfo, setErrorChangeInfo] = React.useState('')
    const { albumId } = useParams()
    const { user } = useAppSelector(state => state.userReducer)
    const { data: dataAlbum, refetch: refetchAlbum, error: errorAlbum, isError: isErrorAlbum } = albumApi.useGetOneAlbumQuery({ albumId, userId: user.id })
    const [addAlbumInLibrary] = albumApi.useAddAlbumInLibraryMutation()
    const [deleteAlbumFromLibrary] = albumApi.useDeleteAlbumFromLibraryMutation()
    const [deleteTrackFromAll, { isSuccess: isSuccessDeleteAlbum }] = albumApi.useDeleteAlbumFromAllMutation()
    const [addTrackInPlaylist] = playlistApi.useAddTrackInPlaylistMutation()
    const [deleteTrackFromPlaylist] = playlistApi.useDeleteTrackFromPlaylistMutation()
    const [updateLibrary] = libraryApi.useUpdateLibraryMutation()
    const actionsModal = useActionCreators(modalAction)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { color, onSetColor } = useSetColor(dataAlbum?.avatar)

    React.useEffect(() => {
        if (isSuccessDeleteAlbum) navigate('/')
    }, [isSuccessDeleteAlbum])

    React.useEffect(() => {
        if (dataAlbum?.name) setInfos({ ...infos, name: dataAlbum.name })
    }, [dataAlbum?.name])

    React.useEffect(() => {
        if (isErrorAlbum) {
            actionsModal.onOpenModal()
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
            actionsModal.onOpenModal()
            actionsModal.addErrorMessage({ message: errorChangeInfo })
            return
        }

        const formData = new FormData()
        formData.append('albumId', String(dataAlbum?.id))
        formData.append('userId', String(user.id))
        if (infos.avatar) formData.append('avatar', infos.avatar, infos.avatar?.name)
        formData.append('name', String(infos.name))
        formData.append('deleteAvatar', String(infos.deleteAvatar))

        await dispatch(updateAlbumThunk(formData))
            .unwrap()
            .then(async () => {
                await refetchAlbum()
                await updateLibrary(null)
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
                src={`${SERVER_API}/image/${dataAlbum?.avatar}`}
                getColors={onSetColor}
            />
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
                color={color}
            />

            <TrackMenu haveInLibrary={dataAlbum?.usersLibrary ? dataAlbum?.usersLibrary[0]?.id === user.id : false}
                author={dataAlbum?.author.id === user.id}
                authorId={dataAlbum?.author?.id}
                type='альбом'
                userId={user.id}
                addInLibrary={async () => await addAlbumInLibrary({ albumId: dataAlbum?.id, userId: user.id })}
                deleteFromLibrary={async () => await deleteAlbumFromLibrary({ albumId: dataAlbum?.id, userId: user.id })}
                deleteFromAll={async () => await deleteTrackFromAll({ albumId: dataAlbum?.id, userId: user.id })}
                showChangeInfoModal={showModal}
                setShowChangeInfoModal={setShowModal}
                color={color}
                deleteFrom='медиатеки'
                isProfile={false}
            />

            <div className={styles.content__track}>
                <FieldDescriptionTrack playlist={false}
                    gridTemplateColumns={GRID_TEMPLATE_FOR_ALBUM}
                />
                {!!dataAlbum?.tracks.length
                    ? <ListTrackForAlbum>
                        {dataAlbum.tracks?.map((track, index) =>
                            <ItemTrack key={track.id}
                                style={{
                                    gridTemplateColumns: GRID_TEMPLATE_FOR_ALBUM,
                                    animationDelay: `.${index}s`,
                                }}
                            >
                                <IndexTrack index={index} />
                                <AvatarTitle avatar={track.avatar}
                                    nameAuthor={track.author.name}
                                    name={track.name}
                                    idAuthor={track.author.id}
                                    pathToTitle={`/${TRACK_ROUTE}/${track.id}`}
                                />
                                <TimeTrack time={'time'}
                                    userId={user.id}
                                    author={false}
                                    haveInPlaylist={track?.playlists ? !!track.playlists[0]?.name : false}
                                    trackId={track.id}
                                    addInPlaylist={addTrackInPlaylist}
                                    deleteTrackFromPlaylist={deleteTrackFromPlaylist}
                                    setShowMenu={setShowMenu}
                                    showMenu={track.id}
                                >
                                    {showMenu === track?.id
                                        ? <ContextMenu style={{ top: 0, right: 25 }}
                                            setShowMenu={setShowMenu}
                                        >
                                            <ButtonMenu icon={<BsPlusLg />}
                                                onClick={() => { }}
                                                text='Добавить в плейлист'
                                                unwrap={<IoMdArrowDropright />}
                                            />
                                            <ButtonMenu icon={<BsPerson />}
                                                onClick={() => navigate(`/${PROFILE_ROUTE}/${track.author.id}`)}
                                                text='К исполнителю'
                                            />
                                            {dataAlbum?.author.id === user.id
                                                && < ButtonMenu icon={<MdDeleteOutline />}
                                                    onClick={() => { }}
                                                    text='Удалить трек'
                                                />
                                            }
                                        </ContextMenu>
                                        : <></>
                                    }

                                </TimeTrack>
                            </ItemTrack>
                        )}
                    </ListTrackForAlbum>
                    : <div className={styles.not__found}>
                        <span>Тут пока ничего нет</span>
                    </div>
                }
            </div>
        </>
    )
}

export default Album
