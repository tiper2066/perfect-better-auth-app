import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface ReturnButtonProps {
    href: string;
    label: string;
}

const ReturnButton = ({ href, label }: ReturnButtonProps) => {
    return (
        <Button size='sm' asChild>
            <Link href={href}>
                <ArrowLeftIcon /> {label}
            </Link>
        </Button>
    );
};
export default ReturnButton;
