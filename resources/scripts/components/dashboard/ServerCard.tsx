import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faMemory, faHdd } from '@fortawesome/free-solid-svg-icons';
import { megabytesToHuman } from '@/helpers';
import getServerResourceUsage from '@/api/server/getServerResourceUsage';

interface Props {
    server: Server;
}

const StatusCircle = ({ status }: { status: string | null }) => {
    const color = !status || status === 'starting' || status === 'stopping' ? tw`bg-neutral-500`
        : status === 'running' ? tw`bg-green-500`
        : status === 'offline' ? tw`bg-red-500`
        : tw`bg-yellow-500`;

    return <div css={[tw`w-3 h-3 rounded-full`, color]} />;
};

export default ({ server }: Props) => {
    const [status, setStatus] = useState<string | null>(server.status);

    useEffect(() => {
        // PERBAIKAN 1: Ganti server.isSuspended menjadi server.status === 'suspended'
        if (server.status === 'suspended' || server.isTransferring) {
            return;
        }

        const getStatus = () => {
            getServerResourceUsage(server.uuid)
                .then(data => setStatus(data.status))
                .catch(error => {
                    console.error(`Could not fetch status for server ${server.name}:`, error);
                    setStatus('offline');
                });
        };

        getStatus();
        const interval = setInterval(getStatus, 30000);

        return () => {
            clearInterval(interval);
        };
      // PERBAIKAN 1 (lagi): Ganti server.isSuspended di dependency array
    }, [server.uuid, server.status, server.isTransferring]);

    return (
        <Link
            to={`/server/${server.id}`}
            css={tw`
                block bg-neutral-800 p-4 rounded-lg shadow-md
                transition-transform transform duration-200 ease-in-out
                hover:scale-105 hover:shadow-xl focus:scale-105 focus:shadow-xl
            `}
        >
            <div css={tw`flex items-center mb-3`}>
                <div css={tw`flex-shrink-0 mr-3`}>
                    <FontAwesomeIcon icon={faServer} css={tw`text-neutral-300 text-2xl`} />
                </div>
                <div css={tw`flex-1 truncate`}>
                    <p css={tw`text-lg font-semibold text-neutral-100 truncate`}>{server.name}</p>
                    <p css={tw`text-xs text-neutral-400`}>{server.node}</p>
                </div>
                <StatusCircle status={status} />
            </div>
            
            <div css={tw`text-sm text-neutral-300 grid grid-cols-2 gap-2 mt-4`}>
                <div css={tw`flex items-center`}>
                    <FontAwesomeIcon icon={faMemory} css={tw`mr-2 text-blue-400`} />
                    <span>{megabytesToHuman(server.limits.memory)}</span>
                </div>
                <div css={tw`flex items-center`}>
                    <FontAwesomeIcon icon={faHdd} css={tw`mr-2 text-purple-400`} />
                    {/* PERBAIKAN 2: Perbaiki typo megabytesTohuman menjadi megabytesToHuman */}
                    <span>{server.limits.disk > 0 ? megabytesToHuman(server.limits.disk) : 'Unlimited'}</span>
                </div>
            </div>
        </Link>
    );
};
