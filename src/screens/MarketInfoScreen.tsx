"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from "react-native"
import { useTranslation } from "react-i18next"
import { Search, TrendingUp, TrendingDown } from "lucide-react-native"
import { LanguageToggle } from "../components/LanguageToggle"
import { useAuthGuard } from "../hooks/useAuthGuard"

const STOCKS = [
  { symbol: "APPL", company: "Apple Inc.", price: "198.24", change: "+2.5%", positive: true, color: "#111" },
  { symbol: "LYFT", company: "Lyft Inc.", price: "410.01", change: "+2.5%", positive: true, color: "#E91E63" },
  { symbol: "MSFT", company: "Microsoft Corp.", price: "$213.10", change: "+2.5%", positive: true, color: "#2196F3" },
  { symbol: "GOOGL", company: "Alphabet Inc.", price: "$213.10", change: "+1.1%", positive: true, color: "#4CAF50" },
  {
    symbol: "SPOT",
    company: "Spotify Technology",
    price: "$213.10",
    change: "-2.5%",
    positive: false,
    color: "#1DB954",
  },
]

export function MarketInfoScreen({ navigation }: any) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  useAuthGuard()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{t("market.title")}</Text>
          <LanguageToggle />
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#667" />
          <TextInput
            style={styles.searchInput}
            placeholder={t("market.search")}
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("market.relevantUpdates")}</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>{t("market.seeAll")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuredStocks}>
            <View style={[styles.featuredStock, { backgroundColor: "#111" }]}>
              <Text style={styles.featuredSymbol}>APPL</Text>
              <Text style={styles.featuredCompany}>Apple Inc.</Text>
              <Text style={styles.featuredPrice}>198.24</Text>
              <Text style={styles.featuredChange}>+ 2.5%</Text>
            </View>

            <View style={[styles.featuredStock, { backgroundColor: "#E91E63" }]}>
              <Text style={styles.featuredSymbol}>LYFT</Text>
              <Text style={styles.featuredCompany}>Lyft Inc.</Text>
              <Text style={styles.featuredPrice}>410.01</Text>
              <Text style={styles.featuredChange}>+ 2.5%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t("market.currentMarket")}</Text>
            <TouchableOpacity>
              <TrendingUp size={20} color="#667" />
            </TouchableOpacity>
          </View>

          <View style={styles.stocksList}>
            {STOCKS.map((stock, index) => (
              <View key={index} style={styles.stockItem}>
                <View style={[styles.stockIcon, { backgroundColor: stock.color }]}>
                  <Text style={styles.stockIconText}>{stock.symbol.charAt(0)}</Text>
                </View>

                <View style={styles.stockInfo}>
                  <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                  <Text style={styles.stockCompany}>{stock.company}</Text>
                </View>

                <View style={styles.stockPrice}>
                  <Text style={styles.stockPriceText}>{stock.price}</Text>
                  <View style={styles.stockChange}>
                    {stock.positive ? (
                      <TrendingUp size={16} color="#10B981" />
                    ) : (
                      <TrendingDown size={16} color="#EF4444" />
                    )}
                    <Text style={[styles.stockChangeText, { color: stock.positive ? "#10B981" : "#EF4444" }]}>
                      {stock.change}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#111",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  seeAllText: {
    color: "#2673f3",
    fontSize: 16,
    fontWeight: "500",
  },
  featuredStocks: {
    flexDirection: "row",
    gap: 16,
  },
  featuredStock: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  featuredSymbol: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featuredCompany: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginBottom: 8,
  },
  featuredPrice: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featuredChange: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "500",
  },
  stocksList: {
    gap: 12,
  },
  stockItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  stockIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stockIconText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  stockCompany: {
    fontSize: 14,
    color: "#667",
  },
  stockPrice: {
    alignItems: "flex-end",
  },
  stockPriceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  stockChange: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockChangeText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
})
