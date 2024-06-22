import { PiChefHat } from "react-icons/pi";
const Features = () => {
    return (
        <div >
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto" >
                <div className="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-neutral-200">
                            We provide the best meal for your health.
                        </h2>
                        <p className="mt-2 md:mt-4 text-gray-500 dark:text-neutral-500">
                            We consulted with nutritionist and developed the perfect meal for your health at cheap price cooked with care by professional chef.
                        </p>
                    </div>
                    <div className="grid lg:col-span-2 grid-cols-2">
                        <div className="flex gap-x-5">
                            <PiChefHat className="flex-shrink-0 mt-1 size-6  text-blue-600 dark:text-blue-500"></PiChefHat>

                            <div className="grow">

                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Chef
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Professional chefs trained and instructed to maintain nutrition and hygiene.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5">
                            <svg className="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" /></svg>
                            <div className="grow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Simple and affordable
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Providing students with most affordable foods. So, that you don&apos;t have to eat outside.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5">
                            <svg className="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                            <div className="grow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Keeping Your Health in Mind
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Our documentation and extensive Client libraries contain everything a business needs to build a custom integration.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-x-5">
                            <svg className="flex-shrink-0 mt-1 size-6 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            <div className="grow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Designing for You
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    We actively pursue the right balance between functionality and aesthetics, creating delightful experiences.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>



    );
};

export default Features;