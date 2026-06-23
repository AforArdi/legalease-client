import Link from 'next/link';
import { Building2, Home, Gavel, Lightbulb, Shield } from 'lucide-react';

const categories = [
    {
        ref: 'REF. 001-CORP',
        title: 'Corporate',
        description: 'Mergers, Acquisitions, Compliance',
        icon: Building2,
        keyword: 'Corporate'
    },
    {
        ref: 'REF. 002-FAM',
        title: 'Family',
        description: 'Divorce, Custody, Estates',
        icon: Home,
        keyword: 'Family'
    },
    {
        ref: 'REF. 003-CRIM',
        title: 'Criminal',
        description: 'Defense, Appeals, Investigations',
        icon: Gavel,
        keyword: 'Criminal'
    },
    {
        ref: 'REF. 004-IP',
        title: 'Intellectual Property',
        description: 'Patents, Trademarks, Copyrights',
        icon: Lightbulb,
        keyword: 'Intellectual+Property'
    },
    {
        ref: 'REF. 005-CYB',
        title: 'Cyber',
        description: 'Cybercrime, Privacy & Digital Fraud',
        icon: Shield,
        keyword: 'Cyber'
    }
];

const LegalCategories = () => {
    return (
        <div className="mx-auto px-4 lg:px-8 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d3b27] mb-6">
                Practice Areas Index
            </h2>
            <div className="w-full h-[1px] bg-gray-200 mb-4"></div>

            <div className="flex flex-col">
                {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.ref}
                            href={`/lawyers?category=${category.keyword}`}
                            className={`grid grid-cols-1 md:grid-cols-4 items-center w-full py-6 px-4 md:px-6 transition-colors duration-200 ${index % 2 === 1 ? 'bg-[#f6f6f6]' : 'bg-transparent'
                                } hover:bg-[#eaeaea]`}
                        >
                            {/* Ref */}
                            <div className="col-span-1 mb-3 md:mb-0">
                                <span className="text-[11px] tracking-[0.15em] text-gray-400 font-semibold uppercase">
                                    {category.ref}
                                </span>
                            </div>

                            {/* Title & Icon */}
                            <div className="col-span-1 md:col-span-2 flex items-center gap-4 mb-3 md:mb-0">
                                <Icon className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                                <h3 className="text-xl font-bold text-[#0d3b27]">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <div className="col-span-1 md:text-right">
                                <span className="text-sm font-medium text-gray-500">
                                    {category.description}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default LegalCategories;