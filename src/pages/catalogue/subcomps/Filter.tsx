
import { Input } from "@/components/ui/input";
import CreateModal from "./create-modal";

interface Props {
    setSearchValue: (value: string) => void
    searchValue: string
}
export default function Filter({ searchValue, setSearchValue }: Props) {
    return (
        <div className="flex items-center gap-2 justify-between">


            <div className='flex items-center justify-between w-full'>
                    <div className="col-span-full sm:col-span-3">
                        <Input
                            onChange={(e) => { setSearchValue(e.target.value) }}
                            type="text"
                            id="first-name"
                            value={searchValue}
                            name="first-name"
                            placeholder="Search catalogue"
                            className="w-80  focus-visible:ring-0" />
                    </div>
            </div>

            <div className="flex items-center gap-2 ">
                <CreateModal />
            </div>

        </div>
    );
}
