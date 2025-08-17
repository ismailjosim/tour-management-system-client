
import {
    useGetTourTypesQuery,
    useRemoveTourTypeMutation,
} from '../../redux/features/Tour/tour.api'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import DataLoader from '../../utils/DataLoader'
import { Button } from '../../components/ui/button'
import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import AddTourModal from '../../components/modules/Admin/TourType/AddTourModal'
import DeleteConfirmation from '../../components/DeleteConfirmation'

const AddTourType = () => {
    const { data, isLoading } = useGetTourTypesQuery(undefined)
    const [removeTourType] = useRemoveTourTypeMutation()

    const handleDelete = async (id: string) => {
        return removeTourType(id).unwrap()
    }

    if (isLoading) {
        return <DataLoader />
    }

    return (
        <div className='w-full max-w-7xl mx-auto px-5'>
            <div className='flex justify-between items-center mb-5'>
                <h2>Tour Types</h2>
                <AddTourModal />
            </div>
            <div className='border border-muted rounded-md'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[100px]'>Name</TableHead>
                            <TableHead className='w-[100px]'>createdAt</TableHead>
                            <TableHead className='text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map(
                            (item: { name: string; _id: string; createdAt: string }) => (
                                <TableRow key={item._id}>
                                    <TableCell className='font-medium'>{item.name}</TableCell>
                                    <TableCell className='font-medium'>
                                        {format(new Date(item.createdAt), 'dd-MMM-yyyy: hh:mma')}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <DeleteConfirmation
                                            onConfirm={() => handleDelete(item._id)}
                                        >
                                            <Button size={'sm'}>
                                                <Trash2 />
                                            </Button>
                                        </DeleteConfirmation>
                                    </TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AddTourType
