import React from 'react';
import { Server } from '@/api/server/getServer';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faMemory, faHdd } from '@fortawesome/free-solid-svg-icons';
import { megabytesToHuman } from '@/helpers';

interface Props {
    server: Server;
}

const StatusCircle = ({ status }: { status: string | null }) => {
    return (
        <div
            css={[
                tw`w-3 h-3 rounded-full`,
                status === 'running' && tw`bg-green-500`,
                status === 'offline' && tw`bg-red-500`,
                (status !== 'running' && status !== 'offline') && tw`bg-yellow-500`, // Default untuk starting/stopping
            ]}
        />
    );
};

export default ({ server }: Props) => {
    const status = server.status;

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
                    <span>{server.limits.disk > 0 ? megabytesToHuman(server.limits.disk) : 'Unlimited'}</span>
                </div>
            </div>
        </Link>
    );
};
