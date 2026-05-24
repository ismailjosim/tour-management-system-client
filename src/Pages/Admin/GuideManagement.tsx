/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { EyeIcon, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import {
  useApproveOrRejectGuideMutation,
  useGetAllGuidesQuery,
} from '@/redux/features/guide/guide.api';
import usePagination from '@/hooks/usePagination';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataTable from '@/utils/DataTable';
import DataPagination from '@/utils/DataPagination';
import { toast } from 'sonner';
import GuideModal from '../../components/modules/Admin/Guide/GuideModal';

interface Guide {
  _id: string;
  user: {
    name: string;
    email: string;
    address: string;
    phone: string;
    picture: string;
  };
  country?: string;
  locationDivision?: string;
  division?: {
    name: string;
    thumbnail: string;
    description: string;
  };
  nidPhoto: string;
  nidFrontPhoto?: string;
  nidBackPhoto?: string;
  photo?: string;
  bio?: string;
  experience?: number;
  languages?: string[];
  specialties?: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

const GuideManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { currentPage, limit, handlePageChange, handleLimitChange } = usePagination();
  const { data, isLoading, refetch } = useGetAllGuidesQuery({
    page: currentPage,
    limit,
  });
  const [approveOrRejectGuide, { isLoading: isActionLoading }] = useApproveOrRejectGuideMutation();

  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // Filter guides by status
  const allGuides = data?.data || [];
  const approvedGuides = allGuides.filter((g: Guide) => g.status === 'APPROVED');
  const pendingGuides = allGuides.filter((g: Guide) => g.status === 'PENDING');
  const rejectedGuides = allGuides.filter((g: Guide) => g.status === 'REJECTED');

  const handleGuideAction = async (status: 'APPROVED' | 'REJECTED') => {
    if (!selectedGuide) return;
    try {
      await approveOrRejectGuide({
        guideId: selectedGuide._id,
        status,
      }).unwrap();
      toast.success(`Guide ${status.toLowerCase()} successfully.`);
      setSelectedGuide(null);
      // Refetch data to update the list
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong!');
    }
  };

  const handleViewGuide = (guide: Guide) => {
    setSelectedGuide(guide);
  };

  // Column definitions
  const guideColumns = [
    {
      key: 'user',
      header: 'Guide Name',
      render: (_: any, row: Guide) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.photo || row.user?.picture} alt={row.user?.name} />
            <AvatarFallback>{row.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{row.user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'division',
      header: 'Location',
      render: (_: any, row: Guide) => row.locationDivision || row.division?.name || 'N/A',
    },
    {
      key: 'experience',
      header: 'Experience',
      render: (_: any, row: Guide) => `${row.experience || 0} years`,
    },
    {
      key: 'languages',
      header: 'Languages',
      render: (_: any, row: Guide) =>
        row.languages && row.languages.length > 0 ? row.languages.join(', ') : 'N/A',
    },
    {
      key: 'status',
      header: 'Status',
      render: (_: any, row: Guide) => {
        const statusColors = {
          APPROVED: 'bg-green-100 text-green-800',
          PENDING: 'bg-yellow-100 text-yellow-800',
          REJECTED: 'bg-red-100 text-red-800',
        };
        return (
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColors[row.status]}`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: 'createdAt',
      header: 'Applied On',
      render: (_: any, row: Guide) => {
        if (!row.createdAt) return 'N/A';
        try {
          const date = new Date(row.createdAt);
          if (isNaN(date.getTime())) return 'Invalid date';
          return format(date, 'MMM dd, yyyy');
        } catch {
          return 'Invalid date';
        }
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: Guide) => (
        <Button onClick={() => handleViewGuide(row)} variant="outline" size="sm" className="gap-2">
          <EyeIcon className="h-4 w-4" />
          View Details
        </Button>
      ),
    },
  ];

  const renderTabContent = (guides: Guide[], tabName: string) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    if (guides.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500">No {tabName} found</p>
        </div>
      );
    }

    return (
      <>
        <DataTable data={guides} columns={guideColumns} isLoading={isLoading} />
        {data?.meta && activeTab === 'all' && (
          <DataPagination
            currentPage={data.meta.page}
            totalPage={data.meta.totalPage}
            onPageChange={handlePageChange}
            limit={limit}
            onLimitChange={handleLimitChange}
          />
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Guide Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Manage all guides and guide applications</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
            <EyeIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allGuides.length}</div>
            <p className="text-muted-foreground text-xs">All guide applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {approvedGuides.length}
            </div>
            <p className="text-muted-foreground text-xs">Active guides</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {pendingGuides.length}
            </div>
            <p className="text-muted-foreground text-xs">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {rejectedGuides.length}
            </div>
            <p className="text-muted-foreground text-xs">Not approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Guide List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tab Buttons */}
          <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setActiveTab('all')}
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent px-4 py-2"
            >
              All ({allGuides.length})
            </Button>
            <Button
              onClick={() => setActiveTab('approved')}
              variant={activeTab === 'approved' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Approved ({approvedGuides.length})
            </Button>
            <Button
              onClick={() => setActiveTab('pending')}
              variant={activeTab === 'pending' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Pending ({pendingGuides.length})
            </Button>
            <Button
              onClick={() => setActiveTab('rejected')}
              variant={activeTab === 'rejected' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent px-4 py-2"
            >
              Rejected ({rejectedGuides.length})
            </Button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'all' && renderTabContent(allGuides, 'guides')}
            {activeTab === 'approved' && renderTabContent(approvedGuides, 'approved guides')}
            {activeTab === 'pending' && renderTabContent(pendingGuides, 'pending guide requests')}
            {activeTab === 'rejected' && renderTabContent(rejectedGuides, 'rejected guides')}
          </div>
        </CardContent>
      </Card>

      {/* Guide Modal */}
      <GuideModal
        modalProps={{
          selectedGuide,
          setSelectedGuide,
          handleGuideAction,
          isActionLoading,
        }}
      />
    </div>
  );
};

export default GuideManagement;
