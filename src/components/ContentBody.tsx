import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";

export default function ContentBody({
    page
}: {
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
    function formatDate(date: DateField) {
        if (isFilled.date(date)) {

            const dateOpt: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }

            return new Intl.DateTimeFormat('en-US', dateOpt).format(new Date(date))
        }
    };

    const formatedDate = formatDate(page.data.date);


    return (
        <Bounded as='article' className="">
            <div className="md:py-20 border-slate-800 border-2 rounded-2xl bg-slate-900 px-4 py-10 md:px-8 ">
                <Heading as="h1" >
                    {page.data.title}
                </Heading>
                <div className="flex gap-4  text-yellow-400 text-xl font-bold">
                    {page.tags.map((tag, i) => {
                        return <span key={i}>{tag}</span>
                    })}
                </div>
                <p className="mt-8 border-b border-slate-600 text-xl font-medium">
                    {formatedDate}
                </p>
                <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
                    <SliceZone slices={page.data.slices} components={components} />
                </div>
            </div>

        </Bounded>
    )
}
