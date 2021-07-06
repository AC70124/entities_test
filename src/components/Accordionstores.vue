<template>
    <div>
        <div class="-d--flex -w--100 -my--3">
            <div class="chi-link" :id="`expand-all-${this.$props.item.storeNumber}`">
                Expand All
            </div>
            <span class="-px--1">&sdot;</span>
            <div class="chi-link" :id="`collapse-all-${this.$props.item.storeNumber}`">
                Collapse All
            </div>
        </div>
        <div>
            <div class="chi-accordion -w--100" :id="`nested-accordions-${this.$props.item.storeNumber}`">
                <div v-for="device in deviceNames" :key="device">
                    <div class="chi-accordion__item -bg--none">
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'ThousandEyes' && $props.item.techTE === 'Available'"
                            @click="fetchDiagnosticsData()"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.thousandEyesFlag">ThousandEyes</template>
                                <template v-else-if="$props.item.thousandEyesFlag"
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
                                <template v-if="!$props.item.merakiFlag">Meraki</template>
                                <template v-else-if="$props.item.merakiFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>Meraki</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'Aerohive' && $props.item.techAH === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.aerohiveFlag">Aerohive</template>
                                <template v-else-if="$props.item.aerohiveFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>Aerohive</template
                                >
                            </div>
                        </button>
                        <button
                            class="chi-accordion__trigger"
                            v-if="device === 'CradlePoint' && $props.item.techCP === 'Available'"
                        >
                            <i class="chi-icon icon-plus -icon--primary"></i>
                            <div class="chi-accordion__title">
                                <template v-if="!$props.item.cradlePointFlag">CradlePoint</template>
                                <template v-else-if="$props.item.cradlePointFlag"
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
                                <template v-if="!$props.item.fortinetFlag">Fortinet</template>
                                <template v-else-if="$props.item.fortinetFlag"
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
                                <template v-if="!$props.item.mistFlag">Mist</template>
                                <template v-else-if="$props.item.mistFlag"
                                    ><i class="chi-icon -icon--danger -xs icon-circle-warning"></i>Mist</template
                                >
                            </div>
                        </button>
                        <div
                            class="chi-accordion__content"
                            v-if="device === 'ThousandEyes' && $props.item.techTE === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.thousandEyesFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="thousand in thousandEyesStores"
                                    :key="thousand.thousandEyesStores"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ thousand.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in ThousandEyes</a
                                        >
                                        <RunDiagnosticsTE
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
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Store Number</th>
                                                    <th>Device Manufacturer</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ thousand.storeNumber }}</td>
                                                    <td>{{ thousand.deviceManufacturer }}</td>
                                                    <td>{{ thousand.deviceName }}</td>
                                                    <td>{{ thousand.mgtIpAddress }}</td>
                                                    <td>{{ thousand.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.thousandEyesFlag">
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
                                            <RunDiagnosticsTE
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
                                                    <th>Start Date (GMT)</th>
                                                    <th>Alert Id</th>
                                                    <th>RuleExpression</th>
                                                    <th>RuleId</th>
                                                    <th>RuleName</th>
                                                    <th>TestId</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ thousand.dateStart }}</td>
                                                    <td>{{ thousand.alertId }}</td>
                                                    <td>{{ thousand.ruleExpression }}</td>
                                                    <td>{{ thousand.ruleId }}</td>
                                                    <td>{{ thousand.ruleName }}</td>
                                                    <td>{{ thousand.testId }}</td>
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
                            <div class="chi-accordion -w--100" v-if="!$props.item.merakiFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="meraki in merakiStores"
                                    :key="meraki.merakiStores"
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
                                                    <th>Store Number</th>
                                                    <th>Device Manufacturer</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ meraki.storeNumber }}</td>
                                                    <td>{{ meraki.deviceManufacturer }}</td>
                                                    <td>{{ meraki.deviceName }}</td>
                                                    <td>{{ meraki.mgtIpAddress }}</td>
                                                    <td>{{ meraki.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.merakiFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="meraki in merakiAlerts"
                                    :key="meraki.merakiAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ meraki.name }}
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
                                                    <th>Store</th>
                                                    <th>Name</th>
                                                    <th>Serial</th>
                                                    <th>MAC</th>
                                                    <th>Public IP</th>
                                                    <th>Network ID</th>
                                                    <th>Status</th>
                                                    <th>Last Reported At</th>
                                                    <th>LAN IP</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ this.$props.item.storeNumber }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.name }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.serial }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.mac }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.publicIp }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.networkId }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.status }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.lastReportedAt }}
                                                    </td>
                                                    <td>
                                                        {{ meraki.lanIp }}
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
                            v-if="device === 'Aerohive' && $props.item.techAH === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.aerohiveFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="aerohive in aerohiveStores"
                                    :key="aerohive.aerohiveStores"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            {{ aerohive.deviceName }}
                                        </div>
                                    </button>
                                    <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                        <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                            >View in Aerohive</a
                                        >
                                        <a href="#" class="chi-link">Run Diagnostics</a>
                                    </div>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Store Number</th>
                                                    <th>Device Manufacturer</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ aerohive.storeNumber }}</td>
                                                    <td>{{ aerohive.deviceManufacturer }}</td>
                                                    <td>{{ aerohive.deviceName }}</td>
                                                    <td>{{ aerohive.mgtIpAddress }}</td>
                                                    <td>{{ aerohive.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.aerohiveFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="aerohive in aerohiveAlerts"
                                    :key="aerohive.aerohiveAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ aerohive.hostname }}
                                        </div>
                                        <div class="-d--flex -pl--2 -pl-md--0 -justify-content-md--end">
                                            <a href="#" class="chi-link -pr-md--1 -br-md--1 -mr-md--1 -b--base-dark"
                                                >View in Aerohive</a
                                            >
                                            <a href="#" class="chi-link">Run Diagnostics</a>
                                        </div>
                                    </button>
                                    <div class="chi-accordion__content">
                                        <table class="chi-table -portal">
                                            <thead>
                                                <tr class="-sm">
                                                    <th>Store</th>
                                                    <th>Entity Id</th>
                                                    <th>Severity</th>
                                                    <th>Category</th>
                                                    <th>HostName</th>
                                                    <th>DeviceMac</th>
                                                    <th>ClientMac</th>
                                                    <th>Description</th>
                                                    <th>Timestamp</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ this.$props.item.storeNumber }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.entityId }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.severity }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.category }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.hostname }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.deviceMac }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.clientMac }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.description }}
                                                    </td>
                                                    <td>
                                                        {{ aerohive.timestamp }}
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
                            v-if="device === 'CradlePoint' && $props.item.techCP === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.cradlePointFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="cradlepoint in cradlePointStores"
                                    :key="cradlepoint.cradlePointStores"
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
                                                    <th>Store Number</th>
                                                    <th>Device Manufacturer</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ cradlepoint.storeNumber }}</td>
                                                    <td>{{ cradlepoint.deviceManufacturer }}</td>
                                                    <td>{{ cradlepoint.deviceName }}</td>
                                                    <td>{{ cradlepoint.mgtIpAddress }}</td>
                                                    <td>{{ cradlepoint.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.cradlePointFlag">
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
                                                    <th>Store</th>
                                                    <th>Account</th>
                                                    <th>Actual Firmware</th>
                                                    <th>Asset Id</th>
                                                    <th>Config Status</th>
                                                    <th>
                                                        Configuration Manager
                                                    </th>
                                                    <th>Created At</th>
                                                    <th>Custom1</th>
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
                                                    <th>Upgrade Pending</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ this.$props.item.storeNumber }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.account }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.actual_firmware }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.asset_id }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.config_status }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.configuration_manager }}
                                                    </td>
                                                    <td>
                                                        {{ cradlepoint.created_at }}
                                                    </td>
                                                    <td>
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
                            v-if="device === 'Fortinet' && $props.item.techFT === 'Available'"
                        >
                            <div class="chi-accordion -w--100" v-if="!$props.item.fortinetFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="fortinet in fortinetStores"
                                    :key="fortinet.fortinetStores"
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
                                                    <th>Store Number</th>
                                                    <th>Device Manufacturer</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ fortinet.storeNumber }}</td>
                                                    <td>{{ fortinet.deviceManufacturer }}</td>
                                                    <td>{{ fortinet.deviceName }}</td>
                                                    <td>{{ fortinet.mgtIpAddress }}</td>
                                                    <td>{{ fortinet.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.fortinetFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="fortinet in fortinetAlerts"
                                    :key="fortinet.fortinetAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ this.$props.item.storeNumber }}
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
                                                    <th>Store</th>
                                                    <th>Manufacturer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ this.$props.item.storeNumber }}
                                                    </td>
                                                    <td>
                                                        {{ this.$props.item.deviceManufacturer }}
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
                            <div class="chi-accordion -w--100" v-if="!$props.item.mistFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="mist in mistStores"
                                    :key="mist.mistStores"
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
                                                    <th>Store Number</th>
                                                    <th>Device Manufacturer</th>
                                                    <th>Device Name</th>
                                                    <th>MgtIpAddress</th>
                                                    <th>MacAddress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>{{ mist.storeNumber }}</td>
                                                    <td>{{ mist.deviceManufacturer }}</td>
                                                    <td>{{ mist.deviceName }}</td>
                                                    <td>{{ mist.mgtIpAddress }}</td>
                                                    <td>{{ mist.macAddress }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="chi-accordion -w--100" v-if="$props.item.mistFlag">
                                <div
                                    class="chi-accordion__item -bg--none"
                                    v-for="mist in mistAlerts"
                                    :key="mist.mistAlerts"
                                >
                                    <button class="chi-accordion__trigger">
                                        <i class="chi-icon icon-plus -icon--primary"></i>
                                        <div class="chi-accordion__title">
                                            <i class="chi-icon -icon--danger -xs icon-circle-warning"></i>
                                            {{ mist.name }}
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
                                                    <th>Store</th>
                                                    <th>Manufacturer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="-sm">
                                                    <td>
                                                        {{ this.$props.item.storeNumber }}
                                                    </td>
                                                    <td>
                                                        {{ this.$props.item.deviceManufacturer }}
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
import * as API from '@/modules/dashboard/api/api-urls';
import * as CONS from '@/modules/dashboard/constants/constants';
import RunDiagnosticsTE from './RunDiagnosticsTE.vue';
import { ChartData, ChartDataset, Position, Style, GridStyle } from '@/components/LineChart/chart-data';
// eslint-disable-next-line
declare const chi: any;
@Component({
    components: {
        RunDiagnosticsTE: () =>
            import(/* webpackChunkName: "run-diagnostics-te" */ '@/components/RunDiagnosticsTE.vue'),
    },
    props: {
        item: Object,
        stores: Array,
    },
})
export default class Accordionstores extends Vue {
    deviceNames: Array<string> = ['ThousandEyes', 'Meraki', 'Aerohive', 'CradlePoint', 'Fortinet', 'Mist'];
    thousandEyesStores: Array<object> = [];
    merakiStores: Array<object> = [];
    aerohiveStores: Array<object> = [];
    cradlePointStores: Array<object> = [];
    fortinetStores: Array<object> = [];
    mistStores: Array<object> = [];
    thousandEyesAlerts: Array<object> = [];
    merakiAlerts: Array<object> = [];
    aerohiveAlerts: Array<object> = [];
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
            this.fetchAllStoresForStore(this.deviceNames[i], this.$props.item);
        }
    }
    @Watch('item')
    fetchNextPageData() {
        for (let i = 0; i < this.deviceNames.length; i++) {
            this.fetchAllStoresForStore(this.deviceNames[i], this.$props.item);
        }
    }
    mounted() {
        const expandCollapseAccordion = chi.accordion(
            document.getElementById(`nested-accordions-${this.$props.item.storeNumber}`)
        );
        const expandAll = document.getElementById(`expand-all-${this.$props.item.storeNumber}`);
        const collapseAll = document.getElementById(`collapse-all-${this.$props.item.storeNumber}`);

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
        let sNum = this.$props.item.storeNumber;
        this.dataLoaded = false;
        this.metricsData = [];
        this.tracertData = [];
        Vue.prototype.$http
            .get(API.TE_DIAGNOSTICS_DATA + sNum)
            .then((response: any) => {
                this.metricsData = response.data;
                this.getDateLabels();
                this.prepareDataSet();
            })
            .catch((e: any) => {
                this.errors.push(e);
            });
        Vue.prototype.$http
            .get(API.TE_TRACERT_DIAGNOSTICS_DATA + sNum)
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
    public fetchAllStoresForStore(selDev: any, store: any): void {
        let sNum = store.storeNumber;
        if (selDev == CONS.DEVICE_TE && !store.thousandEyesFlag) {
            let tStores: Array<any> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber == sNum && item.deviceManufacturer == selDev) {
                    tStores.push(item);
                } else if (item.storeNumber == sNum && item.deviceManufacturer == 'CIRCUIT') {
                    tStores.push(item);
                }
            });
            this.thousandEyesStores = tStores;
        }
        if (selDev == CONS.DEVICE_TE && store.thousandEyesFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.TE_STORE + sNum)
                .then((response: any) => {
                    this.thousandEyesAlerts = response.data;
                    console.log('ThousandEyes alerts:' + this.thousandEyesAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_MK && !store.merakiFlag) {
            let mStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber == sNum && item.deviceManufacturer == selDev) {
                    mStores.push(item);
                }
            });
            this.merakiStores = mStores;
        }
        if (selDev == CONS.DEVICE_MK && store.merakiFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.MERAKI_STORE + sNum)
                .then((response: any) => {
                    this.merakiAlerts = response.data;
                    console.log('Meraki alerts:' + this.merakiAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_AH && !store.aerohiveFlag) {
            let aStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber == sNum && item.deviceManufacturer == selDev) {
                    aStores.push(item);
                }
            });
            this.aerohiveStores = aStores;
        }
        if (selDev == CONS.DEVICE_AH && store.aerohiveFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.AEROHIVE_STORE + sNum)
                .then((response: any) => {
                    this.aerohiveAlerts = response.data;
                    console.log('aerohive alerts:' + this.aerohiveAlerts);
                    this.spinnerFlag = false;
                })
                .catch((e: any) => {
                    this.errors.push(e);
                });
        }
        if (selDev == CONS.DEVICE_CP && !store.cradlePointFlag) {
            let cpStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber == sNum && item.deviceManufacturer == selDev) {
                    cpStores.push(item);
                }
            });
            this.cradlePointStores = cpStores;
        }
        if (selDev == CONS.DEVICE_CP && store.cradlePointFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.CRADLEPOINT_STORE + sNum)
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
            let fStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber == sNum && item.deviceManufacturer == selDev) {
                    fStores.push(item);
                }
            });
            this.fortinetStores = fStores;
        }
        if (selDev == CONS.DEVICE_MT && !store.mistFlag) {
            let mtStores: Array<object> = [];
            this.$props.stores.filter(function(item: any) {
                if (item.storeNumber == sNum && item.deviceManufacturer == selDev) {
                    mtStores.push(item);
                }
            });
            this.mistStores = mtStores;
        }
        if (selDev == CONS.DEVICE_MT && store.mistFlag) {
            this.spinnerFlag = true;
            Vue.prototype.$http
                .get(API.MIST_STORE + sNum)
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
