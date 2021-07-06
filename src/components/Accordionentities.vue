<template>
    <div>
        <div class="-d--flex -w--100 -my--3">
            <div class="chi-link" :id="`expand-all-${this.$props.item.siteType}`">Expand All</div>
            <span class="-px--1">&sdot;</span>
            <div class="chi-link" :id="`collapse-all-${this.$props.item.siteType}`">Collapse All</div>
        </div>
        <div>
            <div class="chi-accordion -w--100" :id="`nested-accordions-${this.$props.item.siteType}`">
                <div v-for="device in deviceNames" :key="device">
                    <div class="chi-accordion__item -bg--none">
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'ThousandEyes' && $props.item.techTE === 'Available'"
                            @click="fetchDiagnosticsData()"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.teAlertFlag">ThousandEyes</template>
                                <template v-else-if="$props.item.teAlertFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i
                                    >ThousandEyes</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'Meraki' && $props.item.techMK === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.mkAlertFlag">Meraki</template>
                                <template v-else-if="$props.item.mkAlertFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>Meraki</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'ISR' && $props.item.techISR === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.isrAlertFlag">ISR</template>
                                <template v-else-if="$props.item.isrAlertFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>ISR</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'CradlePoint' && $props.item.techCP === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.cpAlertFlag">CradlePoint</template>
                                <template v-else-if="$props.item.cpAlertFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>CradlePoint</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'Fortinet' && $props.item.techFT === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.ftAlertFlag">Fortinet</template>
                                <template v-else-if="$props.item.ftAlertFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>Fortinet</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'Mist' && $props.item.techMT === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.mtAlertFlag">Mist</template>
                                <template v-else-if="$props.item.mtAlertFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>Mist</template
                                >
                            </div>
                        </button>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'ThousandEyes' && $props.item.techTE === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.teAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="thousand in thousandEyesSites"
                                    :key="thousand.thousandEyesSites"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ thousand.deviceName.split("(")[0] }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in ThousandEyes</a
                                        >
                                        <RunDiagnosticsEntitiesTE
                                            :item="item"
                                            :deviceName="`${thousand.deviceName}`"
                                            :metricsDataDate="metricsDataDate"
                                            :jitterDataSet="jitterDataSet"
                                            :dataLoaded="dataLoaded"
                                            :lossDataSet="lossDataSet"
                                            :avgLatencyDataSet="avgLatencyDataSet"
                                            :minLatencyDataSet="minLatencyDataSet"
                                            :maxLatencyDataSet="maxLatencyDataSet"
                                            :tracertData="tracertData"
                                        />
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ thousand.siteType }}</td>
                                                    <td>{{ thousand.deviceType }}</td>
                                                    <td>{{ thousand.deviceName }}</td>
                                                    <td>{{ thousand.ipAddress }}</td>
                                                    <td>{{ thousand.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.teAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="thousand in thousandEyesAlerts"
                                    :key="thousand.thousandEyesAlerts"
                                >
                                    <button class="chi-accordion__trigger" @click="toggleTable($event)">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ thousand.testName }} | Rule Name: {{ thousand.ruleName }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in ThousandEyes</a
                                            >
                                            <RunDiagnosticsEntitiesTE
                                                :item="item"
                                                :metricsDataDate="metricsDataDate"
                                                :jitterDataSet="jitterDataSet"
                                                :dataLoaded="dataLoaded"
                                                :lossDataSet="lossDataSet"
                                                :avgLatencyDataSet="avgLatencyDataSet"
                                                :minLatencyDataSet="minLatencyDataSet"
                                                :maxLatencyDataSet="maxLatencyDataSet"
                                                :tracertData="tracertData"
                                            />
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Name</th>
                                                    <th>Ip Address</th>
                                                    <th>Mac Address</th>
                                                    <th>Serial Number</th>
                                                    <!-- <th>TestId</th> -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ thousand.siteType }}</td>
                                                    <td>{{ thousand.deviceName }}</td>
                                                    <td>{{ thousand.ipAddress }}</td>
                                                    <td>{{ thousand.macAddress }}</td>
                                                    <td>{{ thousand.serialNumber }}</td>
                                                    <!-- <td>{{ thousand.testId }}</td> -->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'Meraki' && $props.item.techMK === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.mkAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="meraki in merakiSites"
                                    :key="meraki.merakiSites"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ meraki.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in Meraki</a
                                        >
                                        <a href="#" class="chi-link">Run Diagnostics</a>
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ meraki.siteType }}</td>
                                                    <td>{{ meraki.deviceType }}</td>
                                                    <td>{{ meraki.deviceName }}</td>
                                                    <td>{{ meraki.ipAddress }}</td>
                                                    <td>{{ meraki.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.mkAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="meraki in merakiAlerts"
                                    :key="meraki.merakiAlerts"
                                >
                                    <button class="chi-accordion__trigger" @click="toggleTable($event)">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ meraki.deviceName }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in Meraki</a
                                            >
                                            <a href="#" class="chi-link">Run Diagnostics</a>
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>Model Number</th>
                                                    <th>Mac Address</th>
                                                    <th>Serial Number</th>
                                                    <th>Ip Address</th>
                                                    <th>Status</th>
                                                    <!-- <th>LAN IP</th> -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ $props.item.siteType }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.deviceType }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.deviceName }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.modelNumber }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.macAddress }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.serialNumber }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.ipAddress }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.devStatus }}
                                                    </td>
                                                    <!-- <td>
                                                        {{ meraki.lastReportedAt }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.lanIp }}
                                                    </td> -->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'ISR' && $props.item.techISR === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.isrAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="isr in isrSites"
                                    :key="isr.aerohiveSites"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ isr.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in ISR</a
                                        >
                                        <a href="#" class="chi-link">Run Diagnostics</a>
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ isr.siteType }}</td>
                                                    <td>{{ isr.deviceType }}</td>
                                                    <td>{{ isr.deviceName }}</td>
                                                    <td>{{ isr.ipAddress }}</td>
                                                    <td>{{ isr.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.isrAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="isr in isrAlerts"
                                    :key="isr.isrAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ isr.hostname }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in ISR</a
                                            >
                                            <a href="#" class="chi-link">Run Diagnostics</a>
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site</th>
                                                    <th>Device</th>
                                                    <th>Device Name</th>
                                                    <th>Model Number</th>
                                                    <th>Mac Address</th>
                                                    <th>Serial Number</th>
                                                    <th>IP Address</th>
                                                    <th>Device Status</th>
                                                    <!-- <th>Timestamp</th> -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ $props.item.siteType }}
                                                    </td>
                                                    <td>
                                                        {{ isr.deviceType }}
                                                    </td>
                                                    <td>
                                                        {{ isr.deviceName }}
                                                    </td>
                                                    <td>
                                                        {{ isr.modelNumber }}
                                                    </td>
                                                    <td>
                                                        {{ isr.macAddress }}
                                                    </td>
                                                    <td>
                                                        {{ isr.serialNumber }}
                                                    </td>
                                                    <td>
                                                        {{ isr.ipAddress }}
                                                    </td>
                                                    <td>
                                                        {{ isr.devStatus }}
                                                    </td>
                                                    <!-- <td>
                                                        {{ isr.timestamp }}
                                                    </td> -->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'CradlePoint' && $props.item.techCP === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.cpAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="cradlepoint in cradlePointSites"
                                    :key="cradlepoint.cradlePointSites"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ cradlepoint.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in CradlePoint</a
                                        >
                                        <a href="#" class="chi-link">Run Diagnostics</a>
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ cradlepoint.siteType }}</td>
                                                    <td>{{ cradlepoint.deviceType }}</td>
                                                    <td>{{ cradlepoint.deviceName }}</td>
                                                    <td>{{ cradlepoint.ipAddress }}</td>
                                                    <td>{{ cradlepoint.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.cpAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="cradlepoint in cradlePointAlerts"
                                    :key="cradlepoint.cradlePointAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ cradlepoint.name }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in CradlePoint</a
                                            >
                                            <a href="#" class="chi-link">Run Diagnostics</a>
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>Model Number</th>
                                                    <th>Mac Address</th>
                                                    <th>Serial Number</th>
                                                    <th>IP Address</th>
                                                    <!-- <th>Custom1</th>
                                                    <th>Custom2</th>
                                                    <th>Description</th>
                                                    <th>Device Type</th>
                                                    <th>Full Product Name</th>
                                                    <th>Group</th>
                                                    <th>Id</th>
                                                    <th>Ipv4 Address</th>
                                                    <th>Last Known Location</th>
                                                    <th>Locality</th>
                                                    <th>Mac</th>
                                                    <th>Name</th>
                                                    <th>Product</th>
                                                    <th>Reboot Required</th>
                                                    <th>Resource URL</th>
                                                    <th>Serial Number</th>
                                                    <th>State</th>
                                                    <th>State Updated At</th>
                                                    <th>Target Firmware</th>
                                                    <th>Updated At</th>
                                                    <th>Upgrade Pending</th> -->
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ $props.item.siteType }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.deviceType }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.deviceName }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.modelNumber }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.macAddress }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.serialNumber }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.ipAddress }}
                                                    </td>
                                                    <!-- <td>
                                                        {{ cradlepoint.custom1 }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.custom2 }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.description }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.device_type }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.full_product_name }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.group }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.id }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.ipv4_address }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.last_known_location }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.locality }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.mac }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.name }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.product }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.reboot_required }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.resource_url }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.serial_number }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.state }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.state_updated_at }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.target_firmware }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.updated_at }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.upgrade_pending }}
                                                    </td> -->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'Fortinet' && $props.item.techFT === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.ftAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="fortinet in fortinetSites"
                                    :key="fortinet.fortinetSites"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ fortinet.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in Fortinet</a
                                        >
                                        <a href="#" class="chi-link">Run Diagnostics</a>
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ fortinet.siteType }}</td>
                                                    <td>{{ fortinet.deviceType }}</td>
                                                    <td>{{ fortinet.deviceName }}</td>
                                                    <td>{{ fortinet.ipAddress }}</td>
                                                    <td>{{ fortinet.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.ftAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="fortinet in fortinetAlerts"
                                    :key="fortinet.fortinetAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ this.$props.item.siteType }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in Fortinet</a
                                            >
                                            <a href="#" class="chi-link">Run Diagnostics</a>
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site</th>
                                                    <th>Device Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ $props.item.siteType }}
                                                    </td>
                                                    <td>
                                                        {{ $props.item.deviceName }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'Mist' && $props.item.techMT === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.mtAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="mist in mistSites"
                                    :key="mist.mistSites"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ mist.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in Mist</a
                                        >
                                        <a href="#" class="chi-link">Run Diagnostics</a>
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site Name</th>
                                                    <th>Device Type</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ mist.siteType }}</td>
                                                    <td>{{ mist.deviceType }}</td>
                                                    <td>{{ mist.deviceName }}</td>
                                                    <td>{{ mist.ipAddress }}</td>
                                                    <td>{{ mist.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.mtAlertFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="mist in mistAlerts"
                                    :key="mist.mistAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ mist.deviceName }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in Mist</a
                                            >
                                            <a href="#" class="chi-link">Run Diagnostics</a>
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Site</th>
                                                    <th>Device Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ $props.item.siteType }}
                                                    </td>
                                                    <td>
                                                        {{ $props.item.deviceName }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as API from '@/modules/entities/api/api-urls';
import * as CONS from '@/modules/entities/constants/constants';
import RunDiagnosticsEntitiesTE from './RunDiagnosticsEntitiesTE.vue';
import { ChartData, ChartDataset, Position, Style, GridStyle } from '@/components/EntitiesLineChart/chart-data';
// eslint-disable-next-line
declare const chi: any;
@Component({
    components: {
        RunDiagnosticsEntitiesTE: () =>
            import(/* webpackChunkName: "run-diagnostics-te" */ '@/components/RunDiagnosticsEntitiesTE.vue'),
    },
    props: {
        item: Object,
        sites: Array,
    },
})
export default class Accordionentities extends Vue {
    deviceNames: Array<string> = ['ThousandEyes', 'Meraki', 'ISR', 'CradlePoint', 'Mist', 'Fortinet'];
    thousandEyesSites: Array<object> = [];
    merakiSites: Array<object> = [];
    isrSites: Array<object> = [];
    cradlePointSites: Array<object> = [];
    fortinetSites: Array<object> = [];
    mistSites: Array<object> = [];
    thousandEyesAlerts: Array<object> = [];
    merakiAlerts: Array<object> = [];
    isrAlerts: Array<object> = [];
    cradlePointAlerts: Array<object> = [];
    errors: Array<any> = [];
    mistAlerts: Array<object> = [];
    spinnerFlag: boolean = false;
    dataLoaded: boolean = false;
    metricsDataDate: Array<string> = [];
    metricsData: Array<any> = [];
    tracertData: Array<any> = [];
    jitterDataSet: ChartDataset['dataset'] = {};
    lossDataSet: ChartDataset['dataset'] = {};
    avgLatencyDataSet: ChartDataset['dataset'] = {};
    minLatencyDataSet: ChartDataset['dataset'] = {};
    maxLatencyDataSet: ChartDataset['dataset'] = {};
    created() {
        for (let i = 0; i < this.deviceNames.length; i++) {
            this.fetchAllSitesForSite(this.deviceNames[i], this.$props.item);
        }
    }
    @Watch('item')
    fetchNextPageData() {
        for (let i = 0; i < this.deviceNames.length; i++) {
            this.fetchAllSitesForSite(this.deviceNames[i], this.$props.item);
        }
    }
    mounted() {
        const expandCollapseAccordion = chi.accordion(
            document.getElementById(`nested-accordions-${this.$props.item.siteType}`)
        );
        const expandAll = document.getElementById(`expand-all-${this.$props.item.siteType}`);
        const collapseAll = document.getElementById(`collapse-all-${this.$props.item.siteType}`);

        if (expandAll) {
            expandAll.addEventListener('click', () => {
                expandCollapseAccordion.expandAll();
            });
        }

        if (collapseAll) {
            collapseAll.addEventListener('click', () => {
                expandCollapseAccordion.collapseAll();
            });
        }
    }
    public fetchDiagnosticsData(): void {
        let sType = this.$props.item.siteType;
        this.dataLoaded = false;
        this.metricsData = [];
        this.tracertData = [];
        Vue.prototype.$http
            .get(API.TE_DIAGNOSTICS_DATA + sType)
            .then((response: any) => {
                this.metricsData = response.data;
                this.getDateLabels();
                this.prepareDataSet();
            })
            .catch((e: any) => {
                this.errors.push(e);
            });
        Vue.prototype.$http
            .get(API.TE_TRACERT_DIAGNOSTICS_DATA + sType)
            .then((response: any) => {
                this.tracertData = response.data;
                this.dataLoaded = true;
            })
            .catch((e: any) => {
                this.errors.push(e);
            });
    }
    public getDateLabels(): void {
        for (let i = 0; i < this.metricsData.length; i++) {
            this.metricsDataDate.push(this.metricsData[i]['date']);
        }
    }
    public prepareDataSet(): void {
        for (let i = 0; i < this.metricsData.length; i++) {
            this.jitterDataSet[this.metricsData[i]['date']] = this.metricsData[i]['jitter'];
            this.lossDataSet[this.metricsData[i]['date']] = this.metricsData[i]['loss'];
            this.avgLatencyDataSet[this.metricsData[i]['date']] = this.metricsData[i]['avgLatency'];
            this.minLatencyDataSet[this.metricsData[i]['date']] = this.metricsData[i]['minLatency'];
            this.maxLatencyDataSet[this.metricsData[i]['date']] = this.metricsData[i]['maxLatency'];
        }
    }
    public toggleTable(e: any): void {
        let curr_element = e.target;
        let iconPlus = curr_element.classList.contains('icon-plus') ? true : false;
        if (iconPlus) {
            curr_element.classList.replace('icon-plus', 'icon-minus');
            curr_element.parentElement.parentElement.classList.add('-expanded');
        } else {
            curr_element.classList.replace('icon-minus', 'icon-plus');
            curr_element.parentElement.parentElement.classList.remove('-expanded');
        }
    }
    public fetchAllSitesForSite(selDev: any, site: any): void {
        let sType = site.siteType;
        if (selDev == CONS.DEVICE_TE && !site.teAlertFlag) {
            let tSites: Array<any> = [];
            this.$props.sites.filter(function (item: any) {
                if (item.siteType == sType && item.deviceType == selDev) {
                    tSites.push(item);
                } else if (item.siteType == sType && item.deviceType == 'CIRCUIT') {
                    tSites.push(item);
                }
            });
            this.thousandEyesSites = tSites;
        }
        if (selDev == CONS.DEVICE_TE && site.teAlertFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.TE_SITE + sType)
                .then((response: any) => {
                    this.thousandEyesAlerts = response.data;
                    console.log('ThousandEyes alerts:' + this.thousandEyesAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_MK && !site.mkAlertFlag) {
            let mSites: Array<object> = [];
            this.$props.sites.filter(function (item: any) {
                if (item.siteType == sType && item.deviceType == selDev) {
                    mSites.push(item);
                }
            });
            this.merakiSites = mSites;
        }
        if (selDev == CONS.DEVICE_MK && site.mkAlertFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.MERAKI_SITE + sType)
                .then((response: any) => {
                    this.merakiAlerts = response.data;
                    console.log('Meraki alerts:' + this.merakiAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_ISR && !site.isrAlertFlag) {
            let aSites: Array<object> = [];
            this.$props.sites.filter(function(item: any) {
                if (item.siteType == sType && item.deviceType == selDev) {
                    aSites.push(item);
                }
            });
            this.isrSites = aSites;
        }
        if (selDev == CONS.DEVICE_ISR && site.isrAlertFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.ISR_SITE + sType)
                .then((response: any) => {
                    this.isrAlerts = response.data;
                    console.log('isr alerts:' + this.isrAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_CP && !site.cpAlertFlag) {
            let cpSites: Array<object> = [];
            this.$props.sites.filter(function (item: any) {
                if (item.siteType == sType && item.deviceType == selDev) {
                    cpSites.push(item);
                }
            });
            this.cradlePointSites = cpSites;
        }
        if (selDev == CONS.DEVICE_CP && site.cpAlertFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.CRADLEPOINT_SITE + sType)
                .then((response: any) => {
                    this.cradlePointAlerts = response.data;
                    console.log('cradlepoint alerts:' + this.cradlePointAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_FT) {
            let fSites: Array<object> = [];
            this.$props.sites.filter(function (item: any) {
                if (item.siteType == sType && item.deviceType == selDev) {
                    fSites.push(item);
                }
            });
            this.fortinetSites = fSites;
        }
        if (selDev == CONS.DEVICE_MT && !site.mtAlertFlag) {
            let mtSites: Array<object> = [];
            this.$props.sites.filter(function (item: any) {
                if (item.siteType == sType && item.deviceType == selDev) {
                    mtSites.push(item);
                }
            });
            this.mistSites = mtSites;
        }
        if (selDev == CONS.DEVICE_MT && site.mtAlertFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.MIST_SITE + sType)
                .then((response: any) => {
                    this.mistAlerts = response.data;
                    console.log('mist alerts:' + this.mistAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
    }
}
</script>
<style lang="scss" scoped>
/* Do not use - for presentation purposes only */
body {
    margin: 3rem !important;
}

/* Needed to support custom accordion expand/collapse icons - will include in next Chi release */
.-expanded > .chi-accordion__trigger > .chi-icon.icon-plus:before {
    content: '\e974';
}

/* Needed for expand all/collapse all links - will include in next Chi release */
.chi-link {
    cursor: pointer;
}
</style>
